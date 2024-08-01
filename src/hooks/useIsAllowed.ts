import { isAllowed } from "@stellar/freighter-api";
import { useEffect, useState } from "react";

const useIsAllowed =  () => {

    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        const checkIsAllowed = async () => {
            const result  =  await isAllowed()
            setAllowed(result)
            
        };
        
        checkIsAllowed();

    },[])

    return {allowed, setAllowed}
}

export default useIsAllowed
