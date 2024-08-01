import { contractInvoke } from "@soroban-react/contracts";
import { SorobanContextType } from "@soroban-react/core";
import {  scValToJs } from "../../helpers/convert";
import { xdr } from "@stellar/stellar-sdk";


export const getName = async (address: string, sorobanContext: SorobanContextType): Promise<string> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "name",
      sorobanContext,
      signAndSend: false,
    });

   const name = scValToJs(response as xdr.ScVal) as string;
   return name
  };

export const getSymbol = async (address: string, sorobanContext: SorobanContextType): Promise<string> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "symbol",
      sorobanContext,
      signAndSend: false,
    });

   const name = scValToJs(response as xdr.ScVal) as string;
   return name
  };


 