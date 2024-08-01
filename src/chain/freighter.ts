import { requestAccess, signTransaction,getPublicKey, setAllowed } from '@stellar/freighter-api';

async function checkConnection() {
    const isAllowed =await setAllowed();
    if(isAllowed) {
        return isAllowed;
    }
}

const retrievePublicKey = async () => {
    let publicKey = "";
    let error = "";
  
    try {
      publicKey = await getPublicKey();
    } catch (e: any) {
      error = e;
    }
  
    if (error) {
      return error;
    }
  
    return publicKey;
  };

  const userSignTransaction = async (
    xdr: string,
    network: string,
    signWith:string
  ) => {
    let signedTransaction = "";
    let error = "";
  
    try {
      signedTransaction = await signTransaction(xdr, {
        network,
        accountToSign: signWith,
      });
    } catch (e: any) {
      error = e;
    }
  
    if (error) {
      return error;
    }
  
    return signedTransaction;
  };
  
  
export { checkConnection, retrievePublicKey,userSignTransaction  };