import React, { createContext } from "react";
import { Token } from "../../../../types";

interface SwapContextType {
  // open: boolean;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setPaymentToken: (token: Token) => void;
  // setReceiveToken: (token: Token) => void;
}

const MintRedeemContext = createContext<SwapContextType>({
  // open: false,
  // setOpen: () => {},
  // setPaymentToken: (token: Token) => {},
  // setReceiveToken: (token: Token) => {},
});

export default MintRedeemContext;
