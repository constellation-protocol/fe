import { contractInvoke, TxResponse } from "@soroban-react/contracts";
import { SorobanContextType } from "@soroban-react/core";
import {  scValToJs } from "../../helpers/convert";
import { Address, nativeToScVal, xdr } from "@stellar/stellar-sdk";
import { TokenUserBalance } from "../../types";
import { formatTokenAmount } from "../../utils";

export const approve = async (contractAddress: string, from: Address,spender: Address, 
  amount: Number ,
  sorobanContext: SorobanContextType): Promise<TxResponse | xdr.ScVal> => {
   
   const _from = nativeToScVal(from, {type:'address'});
   const _spender = nativeToScVal(spender, {type:'address'});
   const _amount = nativeToScVal(amount,{type:'i128'});

   const expiration_ledger =  nativeToScVal(3110400,{type:'u32'}); 

  let response = await contractInvoke({
    contractAddress: contractAddress,
    method: "approve",
    sorobanContext,
    signAndSend: true,
    args:[ _from,_spender, _amount, expiration_ledger ],

  });
  return response
};


export const getTokenName = async (address: string, sorobanContext: SorobanContextType): Promise<string> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "name",
      sorobanContext,
      signAndSend: false,
    });

   const name = scValToJs(response as xdr.ScVal) as string;
   return name
  };

  export const getTokenDecimals= async (address: string, sorobanContext: SorobanContextType): Promise<number> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "decimals",
      sorobanContext,
      signAndSend: false,
    });

   const name = scValToJs(response as xdr.ScVal) as number;
   return name
  };

export const getTokenSymbol = async (address: string, sorobanContext: SorobanContextType): Promise<string> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "symbol",
      sorobanContext,
      signAndSend: false,
    });

   const name = scValToJs(response as xdr.ScVal) as string;
   return name
  };


  export const getBalanceOf = async (account: string, contractAddress: string, sorobanContext: SorobanContextType): Promise<number> => {
    const _account = nativeToScVal(account, {type:'address'});
    let response = await contractInvoke({
      contractAddress: contractAddress,
      method: "balance",
      args:[_account],
      sorobanContext,
      signAndSend: false,
    });

   const balance = scValToJs(response as xdr.ScVal) as number;
   return balance
  };

  export const getAllowance = async (from: string, spender: string, contractAddress: string, sorobanContext: SorobanContextType) => {
    const _from = nativeToScVal(from, {type:'address'});
    const _spender = nativeToScVal(spender, {type:'address'});

    let response = await contractInvoke({
      contractAddress: contractAddress,
      method: "allowance",
      args:[_from,_spender ],
      sorobanContext,
      signAndSend: false,
    });

   const allownce = scValToJs(response as xdr.ScVal) as number;
   return allownce
  }


  export const getTokenUserBalance = async (account: string, tokenAddress: Address, sorobanContext: SorobanContextType): Promise<TokenUserBalance> => {
 
        const _name = await  getTokenName(tokenAddress.toString() ,  sorobanContext);
        const _symbol = await  getTokenSymbol(tokenAddress.toString() ,  sorobanContext);
        const decimals = await getTokenDecimals(tokenAddress.toString() ,  sorobanContext);

        let  balance: number;
        let balanceLoaded: boolean
        if(!!account) {
          balance = await getBalanceOf(account,tokenAddress.toString(), sorobanContext );
          balanceLoaded = true;
        } else  {
          balance = 0;
          balanceLoaded = false;
        }
        const name = _name.toLowerCase() === 'native' ? 'XLM' : _name;
        const symbol = _symbol.toLowerCase() === 'native' ? 'XLM' : _symbol;

        return {
            name ,
            symbol,
            decimals,
            address: tokenAddress,
            userBalance: formatTokenAmount(balance),
            balanceLoaded
        } 
  };



  export const getTokenUserBalanceList = async (account: string, contractAddress: Array<Address>, sorobanContext: SorobanContextType): Promise<Array<TokenUserBalance>> => {
    const tokenUserBalancePromise: Array<Promise<TokenUserBalance>> = contractAddress.map(async tokenAddress =>  {
        const tokenUserBalanceList = await getTokenUserBalance(account, tokenAddress, sorobanContext );
        return tokenUserBalanceList
    })
    const tokenUserBalance = await Promise.all(tokenUserBalancePromise);
 
    return tokenUserBalance
  };



 