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
  Typography,
} from "@mui/material";
import ComponentsList from "./components-list";

const ConstellationDetails = () => {
  const sorobanContext = useSorobanReact();
  const [token, setToken] = useState<ConstellationToken>();
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
    };
    get();
  }, []);
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
                    },
                    "& .MuiListItemText-secondary": {
                      color: "#fff",
                    },
                  }}
                  primary={token?.symbol}
                  secondary={token?.name}
                />
              </ListItem>
            </List>
          }
        ></CardHeader>
        <CardContent>
          <ComponentsList tokens={components} />
        </CardContent>
        <CardActions sx={{ padding: "0 25px" }}>
          <Link to="/swap" style={{ textDecoration: "none" }}>
            <Typography>Mint / Redeem</Typography>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default ConstellationDetails;
