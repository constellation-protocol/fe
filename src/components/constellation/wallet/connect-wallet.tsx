import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectedWallet from "./select-wallet";
import { formatAddress } from "../../../utils";
import { useSorobanReact } from "@soroban-react/core";

const WalletButton = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const sorobanContext = useSorobanReact();

  useEffect(() => {}, []);

  const handleOnConnect = (address: string) => {
    setKey(address);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <SelectedWallet
        open={open}
        onClose={() => setOpen(false)}
        onConnect={handleOnConnect}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ backgroundColor: "#8865DD", borderRadius: "15px" }}
      >
        {!!sorobanContext.address
          ? formatAddress(sorobanContext.address)
          : "Connect"}
      </Button>
    </>
  );
};

export default WalletButton;
