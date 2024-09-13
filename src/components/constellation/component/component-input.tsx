import { Box, LinearProgress, Stack, TextField } from "@mui/material";
import { useSorobanReact } from "@soroban-react/core";
import { getTokenName, getTokenSymbol } from "../../../chain/contracts/token";
import { useContext, useEffect, useState } from "react";
import CreateConstellationContext from "../create/context/context";
import { Address, StrKey } from "@stellar/stellar-sdk";

const ComponentInput = () => {
  const sorobanContext = useSorobanReact();
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToken, components } = useContext(CreateConstellationContext);

  useEffect(() => {});

  const handleTokenInfo = async (address: string) => {
    if (
      !address ||
      (components.length > 0 &&
        components.some((c) => c.address.toString() === address))
    ) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    const name = await getTokenName(address, sorobanContext);
    const symbol = await getTokenSymbol(address, sorobanContext);
    addToken({
      name,
      symbol,
      address: new Address(address),
      amount: 0,
      amountError: false,
    });
    setAddress("");
    setLoading(false);
  };

  const handleAddress = (input: string) => {
    const _input = input.trim();
    setAddress(_input);
    if (_input === "") {
      setError(false);
    }
    if (StrKey.isValidContract(_input)) {
      setError(false);
      handleTokenInfo(input);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", padding: "0" }}>
          <TextField
            error={error}
            type="text"
            id="outlined-basic"
            placeholder="Enter Token Address"
            variant="outlined"
            // required
            value={address}
            inputProps={{ readOnly: false }}
            onChange={(e) => handleAddress(e.target.value)}
            sx={{
              borderColor: "none",
              color: "#ffffff",
              width: "100%",
              borderRadius: "14px",
              backgroundColor: "#181A28",
              "& .MuiInputBase-root": {
                border: "none solid",
                height: "100%",
                fontSize: "14px",
                color: "#ffffff",
              },
              "& .MuiInputBase-input": {
                color: "#ffffff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  color: "#ffffff",
                },
                "&.Mui-error fieldset": {
                  borderColor: error ? "#B22222" : "none",
                },
              },
            }}
            InputProps={{
              style: {
                fontWeight: 500,
              },
            }}
          />
          {loading && (
            <LinearProgress
              sx={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px", // Adjust the thickness of the progress bar
                borderRadius: "0px 0px 14px 14px", // Match the border radius of the TextField
              }}
              color="secondary"
            />
          )}
        </Box>
      </Stack>
    </>
  );
};

export default ComponentInput;
