import { Address } from "@stellar/stellar-sdk";
import { approve, getAllowance, getBalanceOf } from "./token";
import { SorobanContextType } from "@soroban-react/core";

const xlm =  import.meta.env.VITE_XLM as string;

export const xlmApproveRouter = async (from: Address, amount: Number ,sorobanContext: SorobanContextType) => {
    const constellationRouterAddress = import.meta.env.VITE_CONSTELLATION_ROUTER as string
    const constellationRouter: Address = Address.fromString(constellationRouterAddress)
    await approve(xlm, from, constellationRouter, amount, sorobanContext)
 
 };

 export const xlmGetBalance = async (account: string, sorobanContext: SorobanContextType):
 Promise<number> => {
    const balance =  await getBalanceOf(
        account,
        xlm,
        sorobanContext
    );

    return balance
 }

 export const xlmGetAllowance = async (from: string, spender: string,  sorobanContext: SorobanContextType):
 Promise<number> => {
    const alowance =  await getAllowance(
        from,
        spender,
        xlm,
        sorobanContext
    );

    return alowance
 }