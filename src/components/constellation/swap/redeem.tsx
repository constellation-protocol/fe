import TokenInfo from "./token-info";
import {
  Component,
  ConstellationUserBalance,
  RedeemParams,
  TokenUserBalance,
} from "../../../types";
import { useEffect, useState } from "react";
import SwapContent from "./swap-content";
import SwapAction from "./mint-action";
import { useSorobanReact } from "@soroban-react/core";
import {
  formatNumber,
  getScaledAmount,
  getSwapFeeIncludedAmount,
} from "../../../utils";
import { getXlmAmount } from "../../../view-logic/mint";
import { approve, getBalanceOf } from "../../../chain/contracts/token";
import { redeem, routerGetAllowance } from "../../../chain/contracts/router";
import { Address } from "@stellar/stellar-sdk";

interface Props {
  paymentTokens: Array<TokenUserBalance>;
  constellationTokens: Array<ConstellationUserBalance>;
  switchView: () => void;
}

const Redeem = ({ paymentTokens, constellationTokens, switchView }: Props) => {
  const sorobanContext = useSorobanReact();
  const { address } = sorobanContext;
  const [paymentToken, setPaymentToken] = useState<TokenUserBalance>();
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
        let _balance = 0;
        let _allowance = 0;
        if (constellationToken && constellationToken.address) {
          _balance = await getBalanceOf(
            address,
            constellationToken.address.toString(),
            sorobanContext,
          );
          _allowance = await routerGetAllowance(
            address,
            constellationToken.address.toString(),
            sorobanContext,
          );
          setBalance(_balance);
          setAllowance(_allowance);
        }
      }

      if(!!constellationAmount) {
         _updateReceiveTokenAmount(constellationAmount);
      }
    };
    run();
  }, [
    paymentToken,
    constellationToken,
    //paymentAmount,
    constellationAmount,
    address,
  ]);

  const approveTx = async () => {
    if(!constellationToken ) throw new Error('Uninitialized constellationToken')
    const decimals = constellationToken?.decimals as number;
    let amount_in = getSwapFeeIncludedAmount(constellationAmount as number);
    amount_in = getScaledAmount(amount_in, decimals);
    const constellation_router_str = import.meta.env.VITE_CONSTELLATION_ROUTER as string;
    const constellation_router = Address.fromString(constellation_router_str);
    const from = Address.fromString(accountAddress);
     await approve(
      constellationToken.address.toString(),
      from,
      constellation_router,
      amount_in,
      sorobanContext,
    );
    const allowance  = await routerGetAllowance(accountAddress,  constellationToken.address.toString(), sorobanContext);
    setAllowance(allowance);

  };


  const handleSetConstellationToken = (t: TokenUserBalance) => {
    setConstellationToken(
      constellationTokens.find((c) => c.address === t.address),
    );
  };

  const handleAmountChange = async (amount: Number | string) => {

    if (isNaN(amount as number)) {
      setConstellationAmount("");
      setPaymentAmount("");
      return;
    }

    setConstellationAmount(amount); 
    _updateReceiveTokenAmount(amount);
  };

  const _updateReceiveTokenAmount = async (amount: Number | string) => {
    if(!constellationToken || !paymentToken) return;
    
    const { address: xlm_address, decimals: xlm_decimals } = paymentToken;

    const xlmAmount = await getXlmAmount(
      amount as number,
      xlm_address.toString(),
      xlm_decimals,
      constellationToken.components as Array<Component>,
      sorobanContext,
    );

    setPaymentAmount(parseFloat(formatNumber(xlmAmount, 3)));
  };

  const swap = async () => {
    if (!sorobanContext.address) {
      return;
    }
    if(!paymentToken) return;
    // Get the current Unix timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Add 5 hours (5 * 60 * 60 seconds)
    const deadline = currentTimestamp + 5 * 60 * 60;
    const amount = getScaledAmount(constellationAmount as number, paymentToken?.decimals as number);
    const params: RedeemParams = {
      to: Address.fromString(accountAddress),
      amount,
      constellation_token: constellationToken?.address as Address,
      redeem_token: Address.fromString(paymentToken.address.toString()),
       deadline,
    };

     await redeem(params, sorobanContext);
  };

  return (
    <>
      <SwapContent switchView={switchView}>
        <TokenInfo
        isTokenIn = {true}
          amount={constellationAmount as number}
          readOnly = {false}
          onAmountChange={handleAmountChange}
          selectedToken={constellationToken}
          setSelectedToken={handleSetConstellationToken}
          tokens={constellationTokens}
          label="Sell"
          showSelect={true}
        />
        <TokenInfo
        isTokenIn = {false}
          amount={paymentAmount as number}
          readOnly = {true}
          onAmountChange={setPaymentAmount}
          selectedToken={paymentToken}
          setSelectedToken={setPaymentToken}
          tokens={paymentTokens}
          label="Buy"
          showSelect={true}
        />
        <SwapAction
          address={accountAddress}
          paymentAmount={getScaledAmount(
            constellationAmount as number,
            constellationToken?.decimals as number,
          )}
          balance={balance}
          allowance={allowance}
          inputTokenSelected={!!paymentToken}
          outputTokenSelected={!!constellationToken}
          swap={swap}
          approve={approveTx}
        />
      </SwapContent>
    </>
  );
};

export default Redeem;
