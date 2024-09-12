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
import { SwapStatus } from "./common";

interface Props {
  loadingConstellationTokens: boolean;
  loadingPaymentTokens: boolean;
  paymentTokens: Array<TokenUserBalance>;
  constellationTokens: Array<ConstellationUserBalance>;
  switchView: () => void;
}

const Redeem = ({ paymentTokens, constellationTokens,loadingConstellationTokens,loadingPaymentTokens, switchView }: Props) => {
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
        if (constellationToken) {
         const _balance = await getBalanceOf(
            address,
            constellationToken.address.toString(),
            sorobanContext,
          );

          setBalance(_balance);
          const  _allowance = await routerGetAllowance(
             address,
             constellationToken.address.toString(),
             sorobanContext,
           );
           setAllowance(_allowance);
           setSwapStatus(SwapStatus.completed)
        }
      }

      if(!!constellationAmount && swapStatus === SwapStatus.init) {
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
    if(!constellationToken ) return
    const decimals = constellationToken?.decimals as number;
    let amount_in = getSwapFeeIncludedAmount(constellationAmount as number);
    amount_in = getScaledAmount(amount_in, decimals);
    const constellation_router_str = import.meta.env.VITE_CONSTELLATION_ROUTER as string;
    const constellation_router = Address.fromString(constellation_router_str);
    const from = Address.fromString(accountAddress);
    setSwapStatus(SwapStatus.approving)
     await approve(
      constellationToken.address.toString(),
      from,
      constellation_router,
      amount_in,
      sorobanContext,
    );
    setSwapStatus(SwapStatus.approve_completing)

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
    setSwapStatus(SwapStatus.init)
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
    if(!paymentToken || !constellationToken) return;
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
     setSwapStatus(SwapStatus.swapping)
     await redeem(params, sorobanContext);
    setPaymentAmount(0)
    setConstellationAmount(0)
    setSwapStatus(SwapStatus.swap_completing)
  };

  return (
    <>
      <SwapContent switchView={switchView}>
        <TokenInfo
        isTokenIn = {true}
          amount={constellationAmount as number}
          readOnly = {false}
          loadingTokens = {loadingConstellationTokens}
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
          loadingTokens = {loadingPaymentTokens}
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
          swapStatus = {swapStatus as SwapStatus}
          swap={swap}
          approve={approveTx}
        />
      </SwapContent>
    </>
  );
};

export default Redeem;
