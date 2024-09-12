import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
        // BackdropProps={{
        //   sx: {
        //     backdropFilter: 'blur(8px)',  // Adjust the blur intensity here
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Add a semi-transparent background for better effect
        //   },
        // }}
        PaperProps={{
          style: { position: 'absolute', top:250}, // Adjust the position manually
          //style: { margin:'0 auto '},
          
          sx: {
            '& .MuiDialog-paper': {
              margin: '0 auto', // Reset margins
              padding: 0, // Reset padding if necessary
              overflow: 'hidden', // Ensure overflow is handled correctly
            },
            backgroundColor: "#13141E",
            borderRadius: "15px",
            padding: 0,
            width: "25%",
            border: "2px solid #291c44",
            "@media (min-width: 1440px)": {
              width: "450px", // Set the width to 500px on wide screens (like desktop monitors)
            },
            
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
