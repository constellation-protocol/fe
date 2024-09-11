import { Connector } from "@soroban-react/types";
import { Address } from "@stellar/stellar-sdk";

export interface Wallet extends Connector {
    isDetected: boolean
    isLoading: boolean
}


export interface CreateParams {
    decimal: number;
    name: string;
    symbol: string;
    manager: string;
    components: Array<Address>,
    amounts: Array<number>,
}

export interface MintParams {
    amount_in: number, 
    mint_amount: number, 
    token_in: Address,
    constellation_token_id: Address,
    to: Address, 
    deadline: number
}

export interface RedeemParams {
    to: Address, 
    amount: number, 
    constellation_token: Address,
    redeem_token: Address,
    deadline: number
}

export interface Token {
    name: string;
    symbol: string;
    decimals: number;
    address: Address;
}

export interface TokenUserBalance extends Token {
    userBalance: Number;
    balanceLoaded: boolean
}

export interface Component extends Token {
    unit: number,
}




export interface ConstellationToken extends Token {
    components: Array<Component>
}

export interface ConstellationComponents {
    address: Address;
    components: Array<Component>
}

export interface ConstellationUserBalance extends ConstellationToken, TokenUserBalance {
}
