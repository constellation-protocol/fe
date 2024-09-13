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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ComponentsList from "./components-list";

const ConstellationDetails = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg')); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')); // min-width: 1200px

  const getMainCardWidth = () => {
    if (isLargeDesktop || isDesktop) return '500px';
    else if (isTablet) return '90%';
    else if (isMobile) return '90%'
  }

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
          width: getMainCardWidth(),
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
