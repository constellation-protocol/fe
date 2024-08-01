import { useSorobanReact } from "@soroban-react/core";
import { useEffect, useState } from "react";
import { Wallet } from "../types";

export const useWallets=  () => {

    const sorobanContext = useSorobanReact();

    const [wallets, setWallets] = useState<Wallet[]>([]); 


    useEffect(() => {
        const _wallets = sorobanContext.connectors.map(async wallet => {
            const isDetected = await wallet.isConnected(); 
            return {
                
                ...wallet, 
                isDetected,
                isLoading: false
            }
        })

        Promise.all(_wallets).then(w => {
            setWallets(w)
        }) 

    },[wallets]) 
    return wallets
}