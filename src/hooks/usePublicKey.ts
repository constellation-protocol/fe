import { getPublicKey } from "@stellar/freighter-api";
import { useEffect, useState } from "react";

const usePublicKey =  () => {

    const [publicKey, set] = useState('')

    useEffect(() => {
        const run = async () => {
            const result  =  await getPublicKey()
            set(result)
            
        };
        
        run();

    },[])

    return {publicKey}
}

export default usePublicKey