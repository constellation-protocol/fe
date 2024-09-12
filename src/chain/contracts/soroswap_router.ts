import { contractInvoke } from "@soroban-react/contracts";
import {  SorobanContextType } from "@soroban-react/core"; 
import { Address, nativeToScVal, xdr,   } from "@stellar/stellar-sdk";
import { scValToJs } from "../../helpers/convert";
 

  export const get_amounts_in = async (amount_out: number, token_in: Address, token_out: Address,sorobanContext: SorobanContextType): Promise<Array<number>> => {
    
        const _path = nativeToScVal([token_in,token_out ], {type:'Vec<Address>'});

        const _amount_out= nativeToScVal(amount_out,{type:'i128'});

        const response = await contractInvoke({
          contractAddress: import.meta.env.VITE_SOROSWAP_ROUTER as string,  
          method: "router_get_amounts_in",
          sorobanContext,
          signAndSend: false,
          args:[_amount_out, _path],
        });

        let js_response = scValToJs(response as xdr.ScVal) as Array<number>;

        js_response = js_response.map(r => parseInt(r.toString()))

       return js_response
  }


  