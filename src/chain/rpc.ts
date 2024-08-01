
import * as StellarSdk from '@stellar/stellar-sdk';
import { checkConnection, retrievePublicKey, userSignTransaction } from './freighter';
const { nativeToScVal, Contract, SorobanRpc, TransactionBuilder, Networks, BASE_FEE, Keypair,Address  } = StellarSdk 
// import 'dotenv/config';

const rpcUrl = "https://soroban-testnet.stellar.org"

export const stringToSymbol = (value: string) => {
    return nativeToScVal(value, {type: 'symbol'})
}
  
export const numberToU64 = (value: number) => {
    return nativeToScVal(value, {type: 'u64'})
}

export const accountToScVal = (account: string) => new Address(account).toScVal();

let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}

export async function contractInit(caller: string, functName: string, values: Array<any>, contractAddress: string): Promise<any> {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    // console.log('caller - ', caller)
    //caller = 'GDSUO7UY2UYSUOQAVYW7CZA7GRE6OW2ULTYQAE4IAN3CYUUMSRCYMKNT'
    const sourceAccount = await provider.getAccount( caller as string);
     const contract = new Contract(contractAddress); 

    let buildTx;
    let result
    if(values.length === 0) {
         buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30)
        .build();
    } else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30)
        .build();
    }

    let _buildTx = await provider.prepareTransaction(buildTx);
    let prepareTx = _buildTx.toXDR();
    let signedTx = await userSignTransaction(prepareTx, 'TESTNET', caller);
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                console.log('txResponse ',txResponse)
                let transactionMeta = txResponse.resultMetaXdr;
                //scAddressTypeContract
                let returnValue = (transactionMeta.v3().sorobanMeta() as StellarSdk.xdr.SorobanTransactionMeta).returnValue();
                console.log(`Transaction result: ${returnValue.value()?.toString()}`);

                 result = txResponse.returnValue  ;


                
               // return result as StellarSdk.xdr.ScVal;
            }
        } else {
   
        }
    } catch (err) {
        throw err;
    }

    return result 
  
}

// async function fetchPoll(caller) {
//    const result = await contractInit(caller, 'view_poll', null)
//    const no = (result._value[0]._attributes.val._value).toString();
//    const total = (result._value[1]._attributes.val._value).toString();
//    const yes = (result._value[2]._attributes.val._value).toString();
//    return [no, total, yes] 
// }

// async function fetchVoter(caller) {
//   const voter = accountToScVal(caller);
//   const result = await contractInit(caller, 'view_voter', [voter])
//   const selected = (result._value[0]._attributes.val._value).toString();
//   const time = (result._value[1]._attributes.val._value).toString(); 
//   return [selected, time];
// }
 
// async function vote(caller, value) {
//     const selected = stringToSymbol(value);
//     const voter = accountToScVal(caller)
//     const values =  [voter, selected];
//     const result = await contractInit(caller, 'record_votes', values);
//     return result;
//   }

// export { fetchPoll, fetchVoter, vote }

