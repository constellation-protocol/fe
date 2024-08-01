import { Button } from "@mui/material";
import useIsAllowed from "../../../hooks/useIsAllowed";
import { useEffect, useState } from "react";
import SelectedWallet from "./select-wallet";
import usePublicKey from "../../../hooks/usePublicKey";
import { formatAddress } from "../../../utils";
import { useSorobanReact } from "@soroban-react/core";
import { WalletData } from "@soroban-react/wallet-data";
import { address } from "../../../state/reducer/wallet";
import { useAppSelector } from "../../../state/hooks";

const WalletButton = () => {
  const [open, setOpen] = useState(false);
  // const { allowed, setAllowed } = useIsAllowed();
  // const { publicKey } = usePublicKey();

  const [key, setKey] = useState("");
  const sorobanContext = useSorobanReact();
  // const address = useAppSelector(
  //   (state) => state.wallet.address,
  // );


  useEffect(() => { 
  }, []);

  // useEffect(() => {

  //   if(publicKey) {
  //       setKey(publicKey)
  //   }

  //   console.log('get piblic key --- ')

  // }, [publicKey,allowed])

  const handleOnConnect = (address: string) => {
    setKey(address);
    // setAllowed(true);
  };
  const handleClick = () => {
    setOpen(true);
  };

  // console.log('sorobanContext.address as string ',sorobanContext.address )
  return (
    <>
      <SelectedWallet
        open={open}
        onClose={() => setOpen(false)}
        onConnect={handleOnConnect}
      />
      <Button variant="contained" onClick={handleClick}>
        {/* {!allowed ? "Connect" : formatAddress(key)} */}
        {/* { (!!sorobanContext.address ) ? formatAddress(sorobanContext.address as string) : 'connect'} */}
        {!!sorobanContext.address ? formatAddress(sorobanContext.address) : 'Connect'}
      </Button>
      {/* <WalletData sorobanContext={sorobanContext}/> */}
    </>
  );
};

export default WalletButton;
