import {
  Divider,
  IconButton,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import CreateConstellationContext from "../create/context/context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#262b31",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ComponentItemsList = () => {
  const [error, setError] = useState(false);

  const { components, addAmount, removeToken } = useContext(
    CreateConstellationContext,
  );

  return (
    <>
      <List
        sx={{
          maxHeight: "35vh", // Increase to 30vh for better usability
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {components.map((c, i) => {
          return (
            <React.Fragment key={i}>
              <Stack sx={{ marginTop: "5px" }} key={i}>
                <Item
                  // primary={c.name}
                  key={i}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                    key={i}
                  >
                    <Typography sx={{ flexGrow: 0.2, color: "silver" }}>
                      {c.symbol}
                    </Typography>

                    <Stack
                      key={i}
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                        error={c.amountError}
                        value={c.amount}
                        required
                        onChange={(e) => addAmount(Number(e.target.value), i)}
                        sx={{
                          width: "100px",
                          height: "30px",
                          "& .MuiInputBase-root": {
                            height: "100%",
                            fontSize: "14px",
                            "& fieldset": {
                              borderColor: "silver", // Default border color
                              color: "#ffffff",
                            },
                          },
                          "& .MuiInputBase-input": {
                            // padding: "8px",
                            color: "#ffffff",
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "red", // Border color when there's an error
                          },
                        }}
                      />
                      <IconButton key={i} onClick={() => removeToken(i)}>
                        <RemoveIcon key={i} aria-label="remove component" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Item>
              </Stack>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default ComponentItemsList;
