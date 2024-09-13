import React, { useEffect, useState } from "react";
import { getTokenList } from "../../../chain/contracts/factory";
import { useSorobanReact } from "@soroban-react/core";
import Popover from "@mui/material/Popover";

import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ConstellationToken } from "../../../types";
import { formatAddress } from "../../../utils";
import { Link } from "react-router-dom";

const ListToken = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg")); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg")); // min-width: 1200px

  const getMainCardWidth = () => {
    if (isLargeDesktop || isDesktop) return "500px";
    else if (isTablet) return "90%";
    else if (isMobile) return "90%";
  };

  const sorobanContext = useSorobanReact();
  const [tokens, setTokens] = useState<Array<ConstellationToken>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const conn = async () => {
      const _tokens = await getTokenList(sorobanContext);
      setTokens(_tokens);
      setLoading(false);
    };

    conn();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    address: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAddress(address);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const content = () => {
    if (tokens.length > 0) {
      return (
        <>
          <Table
            aria-label="simple table"
            sx={{
              "& .MuiTableCell-root": { color: "white" },
              "& .MuiTableRow-root": { borderBottom: "1px solid silver" },
            }}
          >
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell sx={{ color: "white", fontFamily: "NeueHaasLight" }}>
                  Token
                </TableCell>
                <TableCell sx={{ fontFamily: "NeueHaasLight" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontFamily: "NeueHaasLight" }}>TVL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.map((token, i) => {
                return (
                  <React.Fragment key={i}>
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ fontFamily: "NeueHaasLight" }}>
                          {token.symbol}
                        </Typography>
                      </TableCell>
                      <TableCell aria-describedby={id}>
                        <Typography
                          sx={{
                            fontFamily: "NeueHaasLight",
                            color: "#B4EFAF",
                            cursor: "pointer",
                          }}
                          onClick={(e) =>
                            handleClick(e, token.address.toString())
                          }
                        >
                          {formatAddress(token.address.toString())}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Link
                          to={`/products/${token.address}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            sx={{
                              color: "#B4EFAF",
                              fontFamily: "NeueHaasLight",
                            }}
                          >
                            details
                          </Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#824F87",
                borderRadius: "10px",
                color: "#FFFFFF",
              },
            }}
          >
            <Typography
              sx={{ p: 2, borderRadius: "24px", fontFamily: "NeueHaasLight" }}
            >
              {selectedAddress}
            </Typography>
          </Popover>
        </>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <>
      <Card
        sx={{
          width: getMainCardWidth(),
          backgroundColor: "#13141E",
          borderRadius: "25px",
          border: "1px solid #824f87",
          minHeight: "65%",
          paddingBottom: "20px",
        }}
      >
        <CardHeader
          title={
            loading
              ? "Loading Assets"
              : !loading && tokens.length === 0
                ? "No Assets Found"
                : "All Assets"
          }
          sx={{
            "& .MuiCardHeader-title": {
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              color: "#fff",
            },
            "& .MuiCardHeader-subheader": {
              fontSize: "0.875rem", // Adjust the subheader font size here
              color: "silver",
            },
          }}
        ></CardHeader>
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "100%",
              backgroundColor: "#13141E",
              color: "white",
            }}
          >
            {" "}
            {content()}
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default ListToken;
