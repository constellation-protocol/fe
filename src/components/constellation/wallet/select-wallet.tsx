import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import FreighterIcon from "./freighter-icon";
import useIsDetected from "../../../hooks/useIsDetected";
import { getPublicKey, setAllowed } from "@stellar/freighter-api";
import { Connector } from "@soroban-react/types";
import { Box, DialogContent, Stack, Typography } from "@mui/material";
import { Wallet } from "../../../types";
import { useWallets } from "../../../hooks/useWallets";
import { useSorobanReact } from "@soroban-react/core";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../state/hooks";
import { getWallets, setAddress } from "../../../state/reducer/wallet";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface Props {
  open: boolean;
  // wallets: Array<Wallet>
  onConnect: (value: string) => void;
  onClose: () => void;
}

function SelectedWallet(props: Props) {
  const { onClose, open } = props;

  const wallets = useWallets();
  // const [address, setAddress] = useState('')

  const sorobanContext = useSorobanReact();

  useEffect(() => {
    console.log(" ----- >> --->>my adress -- ", sorobanContext.address);
  }, []);

  const handleListItemClick = async (wallet: Wallet, isDetected: boolean) => {
    if (isDetected) {
      sorobanContext.setActiveConnectorAndConnect?.(wallet as Connector);

      console.log(" 222----- >> --->>my adress -- ", sorobanContext.address);
    } else {
      window.open(wallet.downloadUrls?.browserExtension, "_blank");
    }

    onClose();
  };

  const disconnect = async () => {
    console.log("disconnect");
    await sorobanContext.disconnect();
  };

  return (
    <Dialog
      onClose={() => onClose()}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#13141E", // Change to your desired background color
          borderRadius: "16px", // Change to your desired border radius
          border: "1px solid #824f87", // Change to your desired border
        },
      }}
    >
      <DialogTitle
        sx={{ color: "#fff", display: "flex", justifyContent: "center" }}
      >
        Connect wallet
      </DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {sorobanContext.connectors.map((wallet, index) => {
            const _wallet = wallets.find((w) => w.id === wallet.id);

            return (
              <ListItem
                onClick={() =>
                  handleListItemClick(
                    wallet as Wallet,
                    _wallet?.isDetected as boolean,
                  )
                }
                key={index}
                disableGutters
                sx={{
                  with: "100%",
                  borderBottom: "1px solid silver", // Silver bottom border
                }}
              >
                <ListItemButton>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "36px",
                      paddingLeft: "15px",
                      alignItems: "center",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    <Box sx={{ width: "10%" }}>
                      <Avatar
                        sx={{ borderRadius: "10px" }}
                        alt=""
                        src={_wallet?.iconUrl as string}
                      />
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      <Typography>{_wallet?.name}</Typography>
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      {_wallet?.isDetected ? (
                        <Typography sx={{ color: "#B4EFAF" }}>
                          Detected
                        </Typography>
                      ) : (
                        <Typography sx={{ color: "#FD766B" }}>
                          Install
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "10px",
              padding: "14px",
            }}
          >
            <Box sx={{ width: "80%" }}>
              <Typography
                sx={{
                  color: "silver",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* Select a wallet to connect. */}
                If you don’t have a wallet installed, click install to install
                your preffered wallet.
              </Typography>
            </Box>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default SelectedWallet;
