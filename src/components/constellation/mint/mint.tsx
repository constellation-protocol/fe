import { Box, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
const MintToken = () => {
  return (
    <>
      <h1>Mint Token</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          //  fullWidth
          // name="text"
          type="number"
          id="outlined-basic"
          // label="Outlined"
          // variant="outlined"
          required
          // value={name}
          // inputProps={{readOnly: false}}
          // onChange={(e)=>setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    </>
  );
};

export default MintToken;
