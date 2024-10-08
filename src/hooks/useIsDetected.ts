import { isConnected } from "@stellar/freighter-api";
import { useEffect, useState } from "react";

const useIsDetected =  () => {

    const [isDetected, set] = useState(false)

    useEffect(() => {
        const run = async () => {
            const result  =  await isConnected()
            set(result)
            
        };
        
        run();

    },[])

    return isDetected
}

export default useIsDetected


