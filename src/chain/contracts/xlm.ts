import { Address } from "@stellar/stellar-sdk";
import { approve } from "./token";
import { SorobanContextType } from "@soroban-react/core";

export const xlmApproveRouter = async (from: Address, amount: Number ,sorobanContext: SorobanContextType) => {
    const xlm = import.meta.env.VITE_XLM as string
    const constellationRouterAddress = import.meta.env.VITE_CONSTELLATION_ROUTER as string
    const constellationRouter: Address = Address.fromString(constellationRouterAddress)
    await approve(xlm, from, constellationRouter, amount, sorobanContext)
 
 };