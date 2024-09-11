import { contractInvoke } from "@soroban-react/contracts";
import { SorobanContextType } from "@soroban-react/core";
import {  nativeToScVal } from "@stellar/stellar-sdk";
import { CreateParams, MintParams, RedeemParams } from "../../types";
import { xlmGetAllowance } from "./xlm";
import { getAllowance } from "./token";

const contractAddress = import.meta.env.VITE_CONSTELLATION_ROUTER as string;

export const createToken = async ({decimal, name, symbol,manager,components, amounts }: CreateParams,sorobanContext: SorobanContextType) => {
 
    const _decimal = nativeToScVal(decimal,{type:'u32'});;
    const _name = nativeToScVal(name);
    const _symbol = nativeToScVal(symbol);
    const _manager = nativeToScVal(manager, {type:'address'});
    const _components = nativeToScVal(components, {type:'Vec<Address>'});
    const _amounts = nativeToScVal(amounts, {type:'i128'});
    let response = await contractInvoke({
      contractAddress: contractAddress,
      method: "create_token",
      sorobanContext,
      signAndSend: true,
      args:[_decimal, _name, _symbol,_manager, _components, _amounts ],
  
    });
 
     console.log('my result ->> ', response)
 
  };
  

  export const mint = async ({mint_amount, amount_in, token_in,to,constellation_token_id, deadline }: MintParams,sorobanContext: SorobanContextType) => {
    
    const _amount_in = nativeToScVal(amount_in,{type:'i128'});
    const _mint_amount = nativeToScVal(mint_amount,{type:'i128'});
    const _token_in = nativeToScVal(token_in, {type:'address'});
    const _constellation_token_id = nativeToScVal(constellation_token_id, {type:'address'});
    const _to = nativeToScVal(to, {type:'address'});
    const _deadline = nativeToScVal(deadline,{type:'u64'});

    let response = await contractInvoke({
      contractAddress: contractAddress,
      method: "mint_exact_tokens",
      sorobanContext,
      signAndSend: true,
      args:[_mint_amount, _amount_in,  _token_in, _to,_constellation_token_id, _deadline ],
  
    });
 
  };

  export const redeem = async ({to, amount ,constellation_token, redeem_token, deadline }: RedeemParams,sorobanContext: SorobanContextType) => {
  
    const _amount = nativeToScVal(amount,{type:'i128'});
    const _redeem_token = nativeToScVal(redeem_token, {type:'address'});
    const _constellation_token_id = nativeToScVal(constellation_token, {type:'address'});
    const _to = nativeToScVal(to, {type:'address'});
    const _deadline = nativeToScVal(deadline,{type:'u64'});


    let response = await contractInvoke({
      contractAddress: contractAddress,
      method: "redeem_into",
      sorobanContext,
      signAndSend: true,
      args:[_to, _amount,  _constellation_token_id, _redeem_token, _deadline ],
  
    });
     console.log('-> redeem response ', response)
  };

  export const routerGetAllowance = async (from: string, token: string, sorobanContext: SorobanContextType): Promise<number> => {
    const allowance = await getAllowance(from,contractAddress,token, sorobanContext)
    return allowance;
 }

  export const routerXlmGetAllowance = async (from: string, sorobanContext: SorobanContextType): Promise<number> => {
     const allowance = await xlmGetAllowance(from,contractAddress, sorobanContext)
     return allowance;
  }