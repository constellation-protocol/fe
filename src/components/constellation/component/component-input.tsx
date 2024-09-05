import { Button, Stack, TextField } from "@mui/material";
import { useSorobanReact } from "@soroban-react/core";
import { getTokenName, getTokenSymbol } from "../../../chain/contracts/token";
import { useContext, useState } from "react";
import CreateConstellationContext from "../create/context/context";
import { Address } from "@stellar/stellar-sdk";

const ComponentInput = () => {
  const sorobanContext = useSorobanReact();
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const { addToken, components } = useContext(CreateConstellationContext);

  const handleTokenInfo = async () => {
    if (
      !address ||
      (components.length > 0 &&
        components.some((c) => c.address.toString() === address))
    ) {
      setError(true);
      return;
    }
    setError(false);
    const name = await getTokenName(address, sorobanContext);
    const symbol = await getTokenSymbol(address, sorobanContext);
    addToken({
      name,
      symbol,
      address: new Address(address),
      amount: 0,
      amountError: false,
    });
  };

  const handleAddress = (input: string) => {
    console.log("input ", input);
    setAddress(input);
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
        <TextField
          error={error}
          type="text"
          id="outlined-basic"
          label="Token Address"
          variant="outlined"
          // required
          value={address}
          inputProps={{ readOnly: false }}
          onChange={(e) => handleAddress(e.target.value)}
          sx={{
            color: "#ffffff",
            width: "85%",
            "& .MuiInputBase-root": {
              height: "100%",
              fontSize: "14px",
              color: "#ffffff",
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "silver",
                color: "#ffffff",
              },
              "&.Mui-error fieldset": {
                borderColor: "red",
              },
            },
          }}
          InputProps={{
            style: {
              fontWeight: 500,
            },
          }}
        />

        <Button
          onClick={handleTokenInfo}
          sx={{
            width: "15%",
            height: "100%",
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: "5px",
            padding: "15px 16px",
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
          // startIcon={<AddIcon />}
        >
          Add{" "}
        </Button>
      </Stack>
    </>
  );
};

export default ComponentInput;
