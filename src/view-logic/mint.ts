import { SorobanContextType } from "@soroban-react/core";
import { Address } from "@stellar/stellar-sdk";
import { get_amounts_in } from "../chain/contracts/soroswap_router";
import { Component } from "../types";



export const getUnitConstellationAmountIn = async (token_in: string, token_in_decimals: number, components: Array<Component>, sorobanContext: SorobanContextType): Promise<number> => {
    
    let total_amoint_int = 0;
   
    for(const component of components) {
        const unitAmount = component.unit * (Math.pow(10, token_in_decimals) /* normalize the result to base token decimal*/)//component.decimals);
    
        const amounts_in = await get_amounts_in(
            unitAmount,
            Address.fromString(token_in),
            Address.fromString(component.address.toString()),
            sorobanContext
        )
    
        //1000 000 
        let amount_in = amounts_in[0]; 

        total_amoint_int += amount_in;     
    }
  
    return total_amoint_int
}
 

export const getConstellationAmount= async (amount_in: number,token_in: string,token_in_decimals: number,  components: Array<Component>, sorobanContext: SorobanContextType): Promise<number> => {

    let total_components_price = await getUnitConstellationAmountIn(token_in,token_in_decimals, components, sorobanContext);

    const constellation_amount = amount_in / total_components_price
 
    return constellation_amount

}

export const getXlmAmount= async (amount_in: number,token_in: string,token_in_decimals: number,  components: Array<Component>, sorobanContext: SorobanContextType): Promise<number> => {

    let total_components_price = await getUnitConstellationAmountIn(token_in,token_in_decimals, components, sorobanContext);

    const constellation_amount = amount_in * total_components_price
 
    return constellation_amount / Math.pow(10, token_in_decimals)

}
 
 
 