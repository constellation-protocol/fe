import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Chip,
  IconButton,
  CardActions,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { useSorobanReact } from "@soroban-react/core";
import ComponentForm from "../component/component-form";
import AddIcon from "@mui/icons-material/Add";
import CreateConstellationContext from "./context/context";
import { createToken } from "../../../chain/contracts/router";

const CreateToken = () => {
  const sorobanContext = useSorobanReact();

  const { components, removeToken, openComponentForm, setOpenComponentForm } =
    useContext(CreateConstellationContext);

  const [decimal, setDecimal] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [manager, setManager] = useState("");

  const handleCreate = async () => {
    const _components = components.map((component) => component.address);
    const amounts = components.map((component) => component.amount);
    await createToken(
      {
        name,
        symbol,
        manager,
        decimal: Number(decimal),
        amounts,
        components: _components,
      },
      sorobanContext,
    );
  };

  return (
    <>
      <Card
        sx={{
          border: "2px solid",
          borderColor: "#291c44",
          borderRadius: "25px",

          backgroundColor: "#13141E",
          color: "silver",
          width: "35%",
          margin: "0 auto",
          paddingBottom: "20px",
        }}
      >
        <CardHeader title="Create Constellation"></CardHeader>
        <CardContent sx={{ overflowY: "auto", maxHeight: "60vh" }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              gap: 2,
              boxSizing: "border-box",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <TextField
                type="text"
                label="Name"
                variant="outlined"
                //  required
                value={name}
                inputProps={{ readOnly: false }}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  width: "48%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontWeight: 600,
                    color: "silver",
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    color: "silver",
                  },
                }}
                InputProps={{
                  style: {
                    fontWeight: 500,
                  },
                }}
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Symbol"
                variant="outlined"
                //  required
                value={symbol}
                inputProps={{ readOnly: false }}
                onChange={(e) => setSymbol(e.target.value)}
                sx={{
                  width: "48%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontWeight: 600,
                    color: "silver",
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    color: "silver",
                  },
                }}
                InputProps={{
                  style: {
                    fontWeight: 500,
                  },
                }}

                //  helperText={!name ? "Require" : "Do not share your password"}
              />
            </Stack>

            <Box sx={{ width: "100%" }}>
              <TextField
                // name="text"
                type="text"
                id="outlined-basic"
                label="Decimal"
                variant="outlined"
                //  required
                value={decimal}
                inputProps={{ readOnly: false }}
                onChange={(e) => {
                  !isNaN(Number(e.target.value))
                    ? setDecimal(e.target.value)
                    : "";
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    color: "silver",
                    fontWeight: 600,
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    color: "silver",
                  },
                }}
                InputProps={{
                  style: {
                    fontWeight: 500,
                  },
                }}
                //   helperText={decimalError && "Invalid decimal"}
              />
            </Box>
            <Box>
              <TextField
                type="text"
                id="outlined-basic"
                label="Manager Address"
                variant="outlined"
                //  required
                value={manager}
                inputProps={{ readOnly: false }}
                onChange={(e) => setManager(e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    height: "56px",
                    color: "silver",
                    fontWeight: 600,
                  },
                  "& .MuiInputLabel-root": {
                    color: "silver",
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  style: {
                    fontWeight: 500,
                  },
                }}
              />
            </Box>

            <ComponentForm
              open={openComponentForm}
              onClose={() => setOpenComponentForm(false)}
            />

            <Card
              sx={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#13141E",

                border: "1px solid", // Set the border width and style
                borderColor: "grey", // Set the border color
                borderRadius: "10px", // Optional: Set the border radius
              }}
            >
              <CardHeader
                sx={{
                  height: "5px",
                  color: "silver",
                  position: "relative",
                  //   padding: "10px",
                  "& .MuiCardHeader-title": {
                    display: "flex",
                    justifyContent: "center",

                    fontSize: "16px",
                  },
                  "& .MuiCardHeader-subheader": {
                    fontSize: "0.875rem", // Adjust the subheader font size here
                    color: "silver",
                  },
                }}
                title="Components"
                //  subheader={components.length === 0 && "Click to add components"}
                action={
                  components.length > 0 ? (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "4px",
                        top: "0px",
                        //  padding: "0px 0px 0px 0px" /* top right bottom left */,
                      }}
                    >
                      <IconButton onClick={() => setOpenComponentForm(true)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <></>
                  )
                }
              ></CardHeader>

              <CardContent sx={{}}>
                {components.length === 0 && (
                  <IconButton
                    onClick={() => setOpenComponentForm(true)}
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.800",
                      borderRadius: "5px",
                      //   marginTop:'10px',
                      color: "#7851D8",
                      // padding: "10px",
                      "&:hover": {
                        backgroundColor: "grey.100",
                      },
                    }}
                    //  startIcon={<AddIcon />}
                  >
                    <AddIcon />
                  </IconButton>
                )}
                <Stack
                  direction="row"
                  spacing={0}
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    // gap: 1,

                    maxHeight: "20vh",
                    // overflowY: "auto",
                  }}
                >
                  {components.map((component, index) => (
                    <Chip
                      key={index}
                      label={`${component.symbol}, ${component.amount}`}
                      //  variant="outlined"
                      onDelete={() => {
                        removeToken(index);
                      }}
                      sx={{
                        margin: "4px",
                        color: "white",
                        backgroundColor: "grey",
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
        <CardActions sx={{ margin: "0 auto", padding: "0 15px" }}>
          <Button
            variant="contained"
            onClick={handleCreate}
            fullWidth
            sx={{
              padding: "0px",
              margin: "0 auto",
              backgroundColor: "#7851D8",
              "&.Mui-disabled": {
                color: "silver",
              },
              font: "Neue Haas Grotesk Display Pro",

              width: "100%",
              height: "60px",
              borderRadius: "10px",
              boxShadow: "none",
              "&:hover": {
                //  backgroundColor: "#FFFFFF",
                boxShadow: "none",
                backgroundColor: "#7851D8",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#7851D8",
              },
            }}
          >
            CREATE
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CreateToken;
