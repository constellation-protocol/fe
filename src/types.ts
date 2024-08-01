import { Connector } from "@soroban-react/types";

export interface Wallet extends Connector {
    isDetected: boolean
    isLoading: boolean
}
