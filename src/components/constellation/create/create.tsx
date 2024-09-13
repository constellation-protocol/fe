import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Chip,
  IconButton,
  CardActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { useSorobanReact } from "@soroban-react/core";
import ComponentForm from "../component/component-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateConstellationContext from "./context/context";
import { createToken } from "../../../chain/contracts/router";
import CreateAction from "./create-action";

const CreateToken = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg")); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg")); // min-width: 1200px

  const getMainCardWidth = () => {
    if (isLargeDesktop || isDesktop) return "500px";
    else if (isTablet) return "60%";
    else if (isMobile) return "90%";
  };

  const sorobanContext = useSorobanReact();
  const [, setAddress] = useState<string>("");
  const { address } = sorobanContext;

  const { components, removeToken, openComponentForm, setOpenComponentForm } =
    useContext(CreateConstellationContext);

  useEffect(() => {
    const run = async () => {
      if (address) {
        setAddress(address);
      }
    };
    run();
  }, [address]);

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
          border: "1px solid",
          borderColor: "#824f87",
          borderRadius: "30px",
          backgroundColor: "#13141E",
          color: "silver",
          width: getMainCardWidth(),
          paddingBottom: "20px",
        }}
      >
        <CardHeader
          sx={{ textAlign: "center" }}
          title="Create Asset"
        ></CardHeader>
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
                variant="outlined"
                placeholder="Token Name"
                value={name}
                inputProps={{ readOnly: false }}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: "#181A28",
                  borderRadius: "14px",
                  width: "48%",
                  "& .MuiInputBase-input": {
                    color: "grey",
                    overflow: "hidden", // Hide scroll bar
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    color: "grey",
                  },
                  "& .MuiInputLabel-root": {
                    color: "grey",
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
                placeholder="Symbol"
                variant="outlined"
                required
                value={symbol}
                inputProps={{ readOnly: false }}
                onChange={(e) => setSymbol(e.target.value)}
                sx={{
                  backgroundColor: "#181A28",
                  borderRadius: "14px",
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
            </Stack>

            <Box sx={{ width: "100%" }}>
              <TextField
                placeholder="Decimal"
                type="text"
                id="outlined-basic"
                variant="outlined"
                required
                value={decimal}
                inputProps={{ readOnly: false }}
                onChange={(e) => {
                  !isNaN(Number(e.target.value))
                    ? setDecimal(e.target.value)
                    : "";
                }}
                sx={{
                  backgroundColor: "#181A28",
                  borderRadius: "14px",
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
              />
            </Box>
            <Box>
              <TextField
                type="text"
                id="outlined-basic"
                placeholder="Asset manager wallet address"
                variant="outlined"
                value={manager}
                inputProps={{ readOnly: false }}
                onChange={(e) => setManager(e.target.value)}
                sx={{
                  backgroundColor: "#181A28",
                  borderRadius: "14px",
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

                border: "0.5px solid", // Set the border width and style
                borderColor: "#B4EFAF", // Set the border color
                borderRadius: "20px", // Optional: Set the border radius
              }}
            >
              <CardHeader
                sx={{
                  height: "5px",
                  color: "silver",
                  position: "relative",
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
                action={
                  components.length > 0 ? (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "4px",
                        top: "0px",
                      }}
                    >
                      <IconButton
                        sx={{ color: "#7851D8" }}
                        onClick={() => setOpenComponentForm(true)}
                      >
                        <AddCircleIcon />
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
                      borderColor: "grey.800",
                      color: "#7851D8",
                      "&:hover": {},
                    }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                )}
                <Stack
                  direction="row"
                  spacing={0}
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    maxHeight: "20vh",
                  }}
                >
                  {components.map((component, index) => (
                    <Chip
                      key={index}
                      label={`${component.symbol}, ${component.amount}`}
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
          <CreateAction
            walletConnected={!!address}
            hasName={!!name}
            hasSymbol={!!symbol}
            hasDecimal={!!decimal}
            hashManager={!!manager}
            hashComponents={components.length > 0}
            handleCreate={handleCreate}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default CreateToken;
