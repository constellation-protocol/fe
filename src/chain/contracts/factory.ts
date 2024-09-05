import { contractInvoke } from "@soroban-react/contracts";
import { SorobanContextType } from "@soroban-react/core";
import {  scValToJs } from "../../helpers/convert";
import { Address, xdr } from "@stellar/stellar-sdk";
import {  getTokenDecimals, getTokenName, getTokenSymbol, getTokenUserBalanceList } from "./token";
import { getComponents } from "./constellation_token";
import { ConstellationToken, TokenUserBalance } from "../../types";

export const getTokenAddresses = async (sorobanContext: SorobanContextType): Promise<Array<Address>> => {
   const factoryAddress = import.meta.env.VITE_CONSTELLATION_FACTORY as string;
    let response = await contractInvoke({
      contractAddress: factoryAddress,
      method: "get_token_list",
      sorobanContext,
      signAndSend: false,
    });

   const tokenAddresses = scValToJs(response as xdr.ScVal) as Array<Address>;
   return tokenAddresses
  };

  export const getTokenList = async (sorobanContext: SorobanContextType): Promise<Array<ConstellationToken>> => {
    const tokenAddresses = await getTokenAddresses(sorobanContext);

    const _components: Array<Promise<ConstellationToken>> = tokenAddresses.map(async address =>  {
        const name = await  getTokenName(address.toString() ,  sorobanContext);
        const symbol = await  getTokenSymbol(address.toString() ,  sorobanContext);
        const components = await getComponents(address.toString(), sorobanContext);
        const decimals = await getTokenDecimals(address.toString(), sorobanContext);

        return {
            name,
            symbol,
            decimals,
            address,
            components
        }
    })

    const components = await Promise.all(_components);
  
    return components
  };


  export const getConstellationUserBalance = async (account: string, sorobanContext: SorobanContextType): Promise<Array<TokenUserBalance>> => {
    const tokenAddresses = await getTokenAddresses(sorobanContext);   
    const result  = await getTokenUserBalanceList(account, tokenAddresses, sorobanContext);
    return result
  };

 