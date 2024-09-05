import { contractInit } from "./rpc";

const contractAddress = 'CB44DLI3VEDYCBEZXUC7TKOH7PERPIOGY24DXGLQDO27JFENQPV6Z7T2'

export async function get_factory_address(caller: string) {
   const result = await contractInit(caller, 'get_factory_address', [],contractAddress)
  // const no = (result_value[0]._attributes.val._value).toString();
//    const total = (result._value[1]._attributes.val._value).toString();
//    const yes = (result._value[2]._attributes.val._value).toString();
//    return [no, total, yes] 

console.log('result ',result)
console.log('result ',result._value._value.toString())
}

// async function fetchPoll(caller) {
//    const result = await contractInit(caller, 'view_poll', null)
//    const no = (result._value[0]._attributes.val._value).toString();
//    const total = (result._value[1]._attributes.val._value).toString();
//    const yes = (result._value[2]._attributes.val._value).toString();
//    return [no, total, yes] 
// }