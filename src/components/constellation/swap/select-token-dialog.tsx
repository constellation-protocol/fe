import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { TokenUserBalance } from "../../../types";
import { formatNumber } from "../../../utils";

interface Props {
  open: boolean;
  tokens: Array<TokenUserBalance>;
  onSelectToken: (token: TokenUserBalance) => void;
  onClose: () => void;
}
const SelectTokenDialog = ({ open, tokens, onClose, onSelectToken }: Props) => {
  const handleSelectToken = (token: TokenUserBalance) => {
    onSelectToken(token);
    onClose();
  };
  return (
    <>
      <Dialog
        onClose={() => onClose()}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#13141E",
            borderRadius: "10px",
            padding: 0,
            width: "25%",
            border: "2px solid #291c44",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", display: "flex" }}>
          Select a Token
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <List sx={{ pt: 0, width: "100%" }}>
            {tokens.map((token, index) => {
              const balance = token.balanceLoaded
                ? formatNumber(token.userBalance, 3)
                : "";

              return (
                <ListItem disablePadding key={index}>
                  <ListItemButton onClick={() => handleSelectToken(token)}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0px",
                        paddingLeft: "0px",
                        alignItems: "space-between",
                        width: "100%",
                        color: "white",
                      }}
                    >
                      <ListItemText
                        primary={token.symbol}
                        secondary={token.name}
                        sx={{
                          "& .MuiListItemText-secondary": {
                            color: "white",
                            fontSize: "10px",
                          },
                        }}
                      />

                      <ListItemText
                        primary={balance}
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          "& .MuiListItemText-root": {
                            color: "white",
                            fontSize: "10px",
                            display: "flex",
                            justifyContent: "right",
                          },
                        }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectTokenDialog;
