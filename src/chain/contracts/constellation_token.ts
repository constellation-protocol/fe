import { contractInvoke } from "@soroban-react/contracts";
import { SorobanContextType } from "@soroban-react/core";
import {  scValToJs } from "../../helpers/convert";
import { Address, xdr } from "@stellar/stellar-sdk";
import { Component, ConstellationComponents, ConstellationToken, ConstellationUserBalance } from "../../types";
import { getTokenDecimals, getTokenName, getTokenSymbol } from "./token";
import { getConstellationUserBalance, getTokenAddresses } from "./factory";

export const getComponents = async (address: string, sorobanContext: SorobanContextType): Promise<Array<Component>> => {
    let response = await contractInvoke({
      contractAddress: address,
      method: "get_components",
      sorobanContext,
      signAndSend: false,
    });
        
    let _components = scValToJs(response as xdr.ScVal) as Array<Component>;
    const componentsPromise = _components.map(async component => {
        const decimals  = await getTokenDecimals(component.address.toString(), sorobanContext)
        const unit = parseInt(component.unit.toString())
        return {
            ...component,
            unit,
            decimals
        }
    });
    const components = Promise.all(componentsPromise);
   return components
};
 
export const getConstellationTokenDetails = async (address: Address, sorobanContext: SorobanContextType): Promise<ConstellationToken> => {
    const name = await  getTokenName(address.toString() ,  sorobanContext);
    const symbol = await  getTokenSymbol(address.toString() ,  sorobanContext);
    const decimals  = await getTokenDecimals(address.toString(), sorobanContext);
    const _components = await getComponents(address.toString(), sorobanContext);
    const componentsPromise: Array<Promise<Component>> = _components.map(async component => {
        const name = await  getTokenName(component.address.toString() ,  sorobanContext);
        const symbol = await  getTokenSymbol(component.address.toString() ,  sorobanContext);
        const decimals = await getTokenDecimals(component.address.toString() ,  sorobanContext)
        
        return {
            ...component,
            name,
            symbol,
            decimals
        }
    })

    const components = await Promise.all(componentsPromise)

    return {
        name,
        symbol,
       decimals,
        address,
        components
    } 
};
export const getConstellationComponents = async (sorobanContext: SorobanContextType): Promise<Array<ConstellationComponents>> => { 
    const addresses  = await getTokenAddresses(sorobanContext);

    const constellationsPromise  = addresses.map( async address => {
        const components = await getComponents(address.toString(), sorobanContext);
         return  {
            address, 
            components
         }
    });

    const  constellations =  await Promise.all(constellationsPromise)
    return constellations;
} 

export const getUserConstellationDetails = async (account: string, sorobanContext: SorobanContextType): Promise<Array<ConstellationUserBalance>> => {
     
    const result = await  getConstellationUserBalance(account, sorobanContext);
    
     const constellationUserBalancePromuse  = result.map(async tokenUserBalance => {
        const components = await getComponents(tokenUserBalance.address.toString(), sorobanContext);
        return {
            ...tokenUserBalance, 
            components
        }
    });
  
    const  constellationUserBalance = Promise.all(constellationUserBalancePromuse);
    return constellationUserBalance
   
  }
