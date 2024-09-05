import React, { createContext } from "react";
import { Token } from "../../../../types";

interface MintRedeemContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentToken: (token: Token) => void;
  setReceiveToken: (token: Token) => void;
}

const MintRedeemContext = createContext<MintRedeemContextType>({
  open: false,
  setOpen: () => {},
  setPaymentToken: (token: Token) => {},
  setReceiveToken: (token: Token) => {},
});

export default MintRedeemContext;
