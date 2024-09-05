import { Address } from "@stellar/stellar-sdk";


export interface Component {
    name: string;
    symbol: string;
    address: Address;
    amount: number;
    amountError: boolean;
}

export interface FormComponent extends Component {
    amountError: boolean;
}