import { Box, InputAdornment, TextField } from "@mui/material";
import SelectToken from "./select-token";
import SelectTokenDialog from "./select-token-dialog";
import { ChangeEvent, useState } from "react";
import { TokenUserBalance } from "../../../types";
import { parse } from "path";

interface Props {
  label: String;
  showSelect: boolean;
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
  tokens,
  onAmountChange,
  selectedToken,
  setSelectedToken,
}: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);


  return (
    <>
      <Box>
        <TextField
        onWheel={event => { event.preventDefault(); }} 
          type="number"
          value={amount}
          placeholder="0" 
          onChange={ (e) => onAmountChange(parseFloat(e.target.value))}
          InputProps={{
         
            startAdornment: showSelect && (
              <InputAdornment position="start">
                <Box>
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
              step:0.01,
              min: 0 ,
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
            "& .MuiInputBase-input": {
              color: "#fff",
              fontSize: "2.25rem", // Increase the text size in the TextField
              padding: "30px 14px", // Adjust padding to maintain text alignment
              overflow: 'hidden', // Hide scroll bar
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // Set the label color to white
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Set the border radius of the TextField to 10px
              overflow: 'hidden', // Hide scroll bar
              resize: 'none',      // Prevents resizing
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "silver", // Keep the border color white on hover
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "silver", // Keep the border color white on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "silver", // Keep the border color white when focused
            },
            '& input[type=number]': {
              MozAppearance: 'textfield', // For Firefox
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none', // For Chrome, Safari, Edge
              margin: 0,
            },
            
          }}
        />
      </Box>
    </>
  );
};

export default TokenInfo;
