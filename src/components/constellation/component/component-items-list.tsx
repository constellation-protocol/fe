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
  backgroundColor: theme.palette.mode === "dark" ? "#181A25" : "#181A25",
  ...theme.typography.body2,
  borderRadius:'20px',
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
              <Stack 
              spacing={10}
              sx={{ display:'flex', marginBottom:'4px', gap:'20px' }} >
                <Item 
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                
                  >
                    <Typography sx={{ flexGrow: 0.2, color: "silver" }}>
                      {c.symbol}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                       
                      placeholder="units"
                        error={c.amountError}
                        value={c.amount > 0 ? c.amount : '' }
                        required
                        onChange={(e) => addAmount(Number(e.target.value), i)}
                        sx={{
                          width: "80px",
                          height: "30px",
                          "& .MuiInputBase-root": {
                            height: "100%",
                            fontSize: "14px",
                            borderRadius: "20px",
                            backgroundColor:'#181A25',
                            "& fieldset": {
                              // borderColor: "silver",  
                              color: "#ffffff",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#ffffff",
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "red", // Border color when there's an error
                          },
                        }}
                      />
                      <IconButton onClick={() => removeToken(i)}>
                        <RemoveIcon  aria-label="remove component" />
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
