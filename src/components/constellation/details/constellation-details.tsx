import { Link, useParams } from "react-router-dom";
import { useSorobanReact } from "@soroban-react/core";
import { useEffect, useState } from "react";
import { getConstellationTokenDetails } from "../../../chain/contracts/constellation_token";
import { Address } from "@stellar/stellar-sdk";
import { Component, ConstellationToken } from "../../../types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ComponentsList from "./components-list";

const ConstellationDetails = () => {
  const sorobanContext = useSorobanReact();
  const [token, setToken] = useState<ConstellationToken>();
  const [loading, setLoading] = useState<boolean>(true);
  const [components, setComponents] = useState<Array<Component>>([]);
  const { id } = useParams();

  useEffect(() => {
    const get = async () => {
      const _token = await getConstellationTokenDetails(
        Address.fromString(id as string),
        sorobanContext,
      );
      setToken(_token);
      setComponents(_token.components);
      setLoading(false)
    };
    get();
  }, []);

  const content = () => {
     if(token) {
         return   <ComponentsList tokens={components} />
     } else {
        return (<>
               <Stack spacing={1}> 
          <Skeleton
            sx={{
              backgroundColor: "#181A25",
              width: "100%",
              borderRadius: "20px",
            }}
            variant="rectangular"
            height={55}
          />
          <Skeleton
            sx={{
              backgroundColor: "#181A25",
              width: "100%",
              borderRadius: "20px",
            }}
            variant="rounded"
            height={55}
          />
          <Skeleton
            sx={{
              backgroundColor: "#181A25",
              width: "100%",
              borderRadius: "20px",
            }}
            variant="rounded"
            height={55}
          />
          
        </Stack>
        </>)
     }
  }

  return (
    <>
      <Card
        sx={{
          width: "40%",
          border: "2px solid",
          borderColor: "#824f87",
          borderRadius: "25px",
          backgroundColor: "#13141E",
          color: "silver",
          margin: "0 auto",
          paddingBottom: "20px",
          "@media (min-width: 1440px)": {
            width: "700px", // Set the width to 500px on wide screens (like desktop monitors)
          },
        }}
      >
        <CardHeader
          title={
            <List>
              <ListItem>
                <ListItemText
                  sx={{
                
                    color: "#fff",
                    "& .MuiListItemText-primary": {
                      color: "silver",
                      fontFamily:'NeueHaasLight',
                      fontSize:'22px',
                    },
                    "& .MuiListItemText-secondary": {
                      color: "#fff",
                      fontFamily:'NeueHaasLight',
                      fontSize:'16px',
                    },
                  }}
                  primary={loading ? 'Loading Asset Details': (!token ? "Asset Details Not Found" : token.symbol)}
                  secondary={token?.name}
                />
              </ListItem>
            </List>
          }
        ></CardHeader>
        <CardContent>
           {content()}
        </CardContent>
        <CardActions sx={{ padding: "0 25px" }}>
          <Link to="/swap" style={{ textDecoration: "none", color:'#B4EFAF' }}>
            <Typography sx={{fontFamily:'NeueHaasLight'}}> Swap</Typography>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default ConstellationDetails;
