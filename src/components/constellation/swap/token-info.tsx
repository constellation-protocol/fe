import { Box, InputAdornment, TextField } from "@mui/material";
import SelectToken from "./select-token";
import SelectTokenDialog from "./select-token-dialog";
import { useState } from "react";
import { TokenUserBalance } from "../../../types";

interface Props {
  label: String;
  showSelect: boolean;
  isTokenIn: boolean;
  readOnly: boolean;
  amount: Number | undefined;
  tokens: Array<TokenUserBalance>;
  onAmountChange: (amount: number) => void;
  setSelectedToken: (token: TokenUserBalance) => void;
  selectedToken: TokenUserBalance | undefined;
}

const TokenInfo = ({
  label,
  showSelect,
  amount,
  readOnly,
  tokens,
  isTokenIn,
  onAmountChange,
  selectedToken,
  setSelectedToken,
}: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextField 
          type="number"
          value={amount}
          placeholder="0"
          onChange={(e) => onAmountChange(parseFloat(e.target.value))}
          InputProps={{
            readOnly: readOnly,
            startAdornment: showSelect && (
              <InputAdornment position="start">
                <Box sx={{position:'relative'}}>
                  <SelectToken
                    symbol={selectedToken?.symbol as string}
                    onClick={() => setOpenDialog(true)}
                  />
                  <SelectTokenDialog
                    onSelectToken={setSelectedToken}
                    tokens={tokens}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                  />
                </Box>
              </InputAdornment>
            ),
            inputProps: {
              step: 0.01,
              min: 0,
              style: {
                textAlign: "right", // Align the text to the far right
                paddingRight: "40px",
              },
            },
          }}
          label={label}
          variant="outlined"
          fullWidth
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              color: "silver",
              fontSize: "2.25rem", // Increase the text size in the TextField
              padding: "30px 14px", // Adjust padding to maintain text alignment
              overflow: "hidden", // Hide scroll bar
            },
            "& .MuiInputLabel-root": {
              color: "silver", // Set the label color to white
            },
          
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Set the border radius of the TextField
              overflow: "hidden", // Hide scroll bar
              resize: "none", // Prevents resizing
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "silver", // Default border color (unfocused)
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "silver", // Keep border color silver on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4caf50 !important", // Change the border color when focused (green)
            },
            "&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
              borderColor: isTokenIn ? "#B4EFAF": "black", // Ensure border color stays silver when not focused
            }, 
            "& input[type=number]": {
              MozAppearance: "textfield", // For Firefox
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none", // For Chrome, Safari, Edge
                margin: 0,
              },
          }}
        />
      </Box>
    </>
  );
};

export default TokenInfo;
