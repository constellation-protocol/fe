import { contractInvoke } from "@soroban-react/contracts";
import {  SorobanContextType } from "@soroban-react/core"; 
import { Address, nativeToScVal, xdr,   } from "@stellar/stellar-sdk";
import { scValToJs } from "../../helpers/convert";
 
export const add_liquidity = async (sorobanContext: SorobanContextType) => {
 
    const token_a = nativeToScVal(import.meta.env.VITE_XLM as string, {type:'address'});
    const token_b = nativeToScVal('CBHLL32UNI7OPK52S5SAEJ43M3BPJECFLO46PQWQIE32PXS76LR3Y77I', {type:'address'});

    const amount_a_desired = nativeToScVal(10,{type:'i128'});
    const amount_b_desired = nativeToScVal(10,{type:'i128'});

    const amount_a_min = nativeToScVal(0,{type:'i128'});
    const amount_b_min = nativeToScVal(0,{type:'i128'});

    const to = nativeToScVal('GCCN7FQWFRTSS7U3YH4K3J466BBMM7PJQARD5A63BKZXSBC3PMFSXA7M',{type:'address'});
    const deadline = nativeToScVal(1924402084,{type:'u64'});

    let response = await contractInvoke({
      contractAddress: import.meta.env.VITE_SOROSWAP_ROUTER as string, // router
      method: "add_liquidity",
      sorobanContext,
      signAndSend: true,
      args:[token_a, token_b, amount_a_desired,amount_b_desired, amount_a_min, amount_b_min, to, deadline ],
      
    });
 
 
 
  }; 

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


  