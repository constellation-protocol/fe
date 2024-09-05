import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import TokenInfo from "./token-info";
import { Component, ConstellationUserBalance, MintParams, TokenUserBalance } from "../../../types";
import { useEffect, useState } from "react";
import { mint } from "../../../chain/contracts/router";
import { Address } from "@stellar/stellar-sdk";
import { useSorobanReact } from "@soroban-react/core";
import { xlmApproveRouter } from "../../../chain/contracts/xlm";
import { approve } from "../../../chain/contracts/token";
import { getConstellationAmount } from "../../../view-logic/mint";
import { formatNumber, getScaledAmount, getSwapFeeIncludedAmount } from "../../../utils";

interface Props {
  paymentTokens: Array<TokenUserBalance>;
  constellationTokens: Array<ConstellationUserBalance>;
}

const Mint = ({ paymentTokens, constellationTokens }: Props) => {
  const sorobanContext = useSorobanReact();
  const [paymentToken, setPaymentToken] = useState<TokenUserBalance>();
  const [constellationToken, setConstellationToken] =
    useState<ConstellationUserBalance>();

  const [paymentAmount, setPaymentAmount] = useState<Number | string>('');
  const [constellationAmount, setConstellationAmount] = useState<Number | string>(''); 

  useEffect(() => {
  
  }, [paymentToken, constellationToken, paymentAmount, constellationAmount]);

 

  const approveTx = async () => {
    const decimals = paymentToken?.decimals as number;
    let amount_in = getSwapFeeIncludedAmount(paymentAmount as number);
     amount_in = getScaledAmount(amount_in, decimals);

    console.log('cscaled ->> ',amount_in)

    const xlm = import.meta.env.VITE_XLM as string;
    const constellation_router_str = import.meta.env
      .VITE_CONSTELLATION_ROUTER as string;
    const constellation_router = Address.fromString(constellation_router_str);
    const from = Address.fromString(sorobanContext?.address as string);
    const result = approve(
      xlm,
      from,
      constellation_router,
      amount_in,
      sorobanContext,
    );
  };

  const swap = async () => {
    if (!sorobanContext.address) {
      console.log("errorr context");
      return;
    }

    // Get the current Unix timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Add 5 hours (5 * 60 * 60 seconds)
    const timestampPlusFiveHours = currentTimestamp + 5 * 60 * 60;

    const to = sorobanContext?.address as string;

    let amount = getSwapFeeIncludedAmount(paymentAmount as number);
    const amount_in = getScaledAmount(
      amount,
      paymentToken?.decimals as number,
    )

    console.log('constellationAmount ->> ',constellationAmount)

    const mint_amount = getScaledAmount(
          constellationAmount as number,
          constellationToken?.decimals as number)
    console.log('mint_amount ', mint_amount)

    const mintParams: MintParams = {
      amount_in,
      mint_amount,
      token_in: paymentToken?.address as Address,
      constellation_token_id: constellationToken?.address as Address,
      to: Address.fromString(to),
      deadline: timestampPlusFiveHours,
    };

    console.log("minting ...");
   await mint(mintParams, sorobanContext);
  };

  const handleAmountChange= async (amount: Number | string) => {

    console.log(' ->> constellationToken ->>',constellationToken ) 
    const token_in = paymentToken?.address.toString() as string ;  
    const decimals = paymentToken?.decimals as number
    const amount_in = amount as number * Math.pow(10,decimals);
  
   if (isNaN(amount as number)) {
    setConstellationAmount('')
    setPaymentAmount('');
     return 
   }
  
   setPaymentAmount(amount);
 
    const amountOut = await getConstellationAmount(
      amount_in,
      token_in,
      decimals,
      constellationToken?.components as Array<Component>,
      sorobanContext
    )  
    
    setConstellationAmount(parseFloat(formatNumber(amountOut, 3)));
  }

  const handleSetConstellationToken = (t : TokenUserBalance) => {
        setConstellationToken(constellationTokens.find(c => c.address === t.address));
  }

  return (
    <>
      <Container>
        <Stack direction={"column"} sx={{ gap: "14px" }}>
          <TokenInfo
            amount={paymentAmount as number}
            onAmountChange={handleAmountChange}
            selectedToken={paymentToken}
            setSelectedToken={setPaymentToken}
            tokens={paymentTokens}
            label="Sell"
            showSelect={true}
          />

          <TokenInfo
            amount={constellationAmount as number}
            onAmountChange={setConstellationAmount}
            selectedToken={constellationToken}
            setSelectedToken={handleSetConstellationToken}
            tokens={constellationTokens}
            label="Buy"
            showSelect={true}
          />
          <Box>
            <Button variant="contained" fullWidth onClick={swap}>
              Swap
            </Button>

            <Button variant="contained" fullWidth onClick={approveTx}>
              Approve
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Mint;
