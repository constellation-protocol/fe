import TokenInfo from "./token-info";
import {
  Component,
  ConstellationUserBalance,
  MintParams,
  TokenUserBalance,
} from "../../../types";
import { useEffect, useState } from "react";
import {
  mint,
  routerXlmGetAllowance,
} from "../../../chain/contracts/router";
import { Address } from "@stellar/stellar-sdk";
import { useSorobanReact } from "@soroban-react/core";
import { approve } from "../../../chain/contracts/token";
import { getConstellationAmount } from "../../../view-logic/mint";
import {
  formatNumber,
  getScaledAmount,
  getSwapFeeIncludedAmount,
} from "../../../utils";
import MintAction from "./mint-action";
import { xlmGetBalance } from "../../../chain/contracts/xlm";
import SwapContent from "./swap-content";
import { SwapStatus } from "./common";

interface Props {
  paymentTokens: Array<TokenUserBalance>;
  constellationTokens: Array<ConstellationUserBalance>;
  loadingConstellationTokens: boolean;
   loadingPaymentTokens: boolean;
  switchView: () => void;
}

const Mint = ({ paymentTokens, constellationTokens,loadingPaymentTokens, loadingConstellationTokens,switchView }: Props) => {
  const sorobanContext = useSorobanReact();
  const { address } = sorobanContext;
  const [paymentToken, setPaymentToken] = useState<TokenUserBalance>();
  const [swapStatus, setSwapStatus] = useState<SwapStatus>();
  const [constellationToken, setConstellationToken] =
    useState<ConstellationUserBalance>();
  const [paymentAmount, setPaymentAmount] = useState<Number | string>("");
  const [constellationAmount, setConstellationAmount] = useState<
    Number | string
  >("");

  const [balance, setBalance] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [accountAddress, setAccountAddress] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      if (address) {
        setAccountAddress(address);
        const _balance = await xlmGetBalance(address, sorobanContext);
        const _allowance = await routerXlmGetAllowance(address, sorobanContext);
        setAllowance(_allowance);
        setBalance(_balance);
        setSwapStatus(SwapStatus.completed)

      }

      if(!!paymentAmount && swapStatus === SwapStatus.init) {
         _updateReceiveTokenAmount(paymentAmount);
      }
    };
    run();
  }, [
    paymentAmount,
    constellationAmount,
    paymentToken,
    constellationToken,
    address,
  ]);

  const approveTx = async () => {
    const decimals = paymentToken?.decimals as number;
    let amount_in = getSwapFeeIncludedAmount(paymentAmount as number);
    amount_in = getScaledAmount(amount_in, decimals);
    const xlm = import.meta.env.VITE_XLM as string;
    const constellation_router_str = import.meta.env.VITE_CONSTELLATION_ROUTER as string;
    const constellation_router = Address.fromString(constellation_router_str);
    const from = Address.fromString(sorobanContext?.address as string);
    setSwapStatus(SwapStatus.approving)
    await approve(xlm, from, constellation_router, amount_in, sorobanContext);
    setSwapStatus(SwapStatus.approve_completing)
  };

  const swap = async () => {
    if (!sorobanContext.address) {
      return;
    }

    // Get the current Unix timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Add 5 hours (5 * 60 * 60 seconds)
    const timestampPlusFiveHours = currentTimestamp + 5 * 60 * 60;

    const to = sorobanContext?.address as string;

    let amount = getSwapFeeIncludedAmount(paymentAmount as number);
    const amount_in = getScaledAmount(amount, paymentToken?.decimals as number);

    const mint_amount = getScaledAmount(
      constellationAmount as number,
      constellationToken?.decimals as number,
    );

    const mintParams: MintParams = {
      amount_in,
      mint_amount,
      token_in: paymentToken?.address as Address,
      constellation_token_id: constellationToken?.address as Address,
      to: Address.fromString(to),
      deadline: timestampPlusFiveHours,
    };
    setSwapStatus(SwapStatus.swapping)
    await mint(mintParams, sorobanContext);
    setPaymentAmount(0)
    setConstellationAmount(0)
    setSwapStatus(SwapStatus.swap_completing)
  };

  const handlePaymentAmountChange = async (amount: Number | string) => {
    setSwapStatus(SwapStatus.init)
    if (isNaN(amount as number)) {
      setConstellationAmount("");
      setPaymentAmount("");
      return;
    }

    setPaymentAmount(amount);
    _updateReceiveTokenAmount(amount);
  };

  const handleReciveAmountChange = (amount: string | Number) => {
    setConstellationAmount(amount)

  }

  const handleSetConstellationToken = (t: TokenUserBalance) => {
    setConstellationToken(
      constellationTokens.find((c) => c.address === t.address),
    ); 

    _updateReceiveTokenAmount(paymentAmount);
  };

  const handleSetPaymentToken = (token: TokenUserBalance) => {
    setPaymentToken(token );
  }

  const _updateReceiveTokenAmount = async (amount: Number | string) => {
    const token_in = paymentToken?.address.toString() as string;
    const decimals = paymentToken?.decimals as number;
    const amount_in = (amount as number) * Math.pow(10, decimals);

    if(!constellationToken || !paymentToken) return;

    const amountOut = await getConstellationAmount(
      amount_in,
      token_in,
      decimals,
      constellationToken?.components as Array<Component>,
      sorobanContext,
    );

    setConstellationAmount(parseFloat(formatNumber(amountOut, 3)));
  };

  return (
    <>
      <SwapContent switchView={switchView}>
        <TokenInfo
        isTokenIn={true}
          amount={paymentAmount as number}
          readOnly = {false}
          onAmountChange={handlePaymentAmountChange}
          selectedToken={paymentToken}
          setSelectedToken={handleSetPaymentToken} 
          loadingTokens = {loadingPaymentTokens}
          tokens={paymentTokens}
          label="Sell"
          showSelect={true}
        />

        <TokenInfo
         isTokenIn={false}
          amount={constellationAmount as number}
          readOnly = {true}
          onAmountChange={handleReciveAmountChange}
          selectedToken={constellationToken}
          setSelectedToken={handleSetConstellationToken}
          tokens={constellationTokens}
          loadingTokens = {loadingConstellationTokens}
          label="Buy"
          showSelect={true}
        />
        <MintAction
          address={accountAddress}
          paymentAmount={getScaledAmount(
            paymentAmount as number,
            paymentToken?.decimals as number,
          )}
          balance={balance}
          allowance={allowance}
          inputTokenSelected={!!paymentToken}
          outputTokenSelected={!!constellationToken}
          swap={swap}
          approve={approveTx}
          swapStatus={swapStatus as SwapStatus}
        />
      </SwapContent>
    </>
  );
};

export default Mint; 