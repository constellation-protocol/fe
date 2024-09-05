import React, { useEffect, useState } from "react";
import { getTokenList } from "../../../chain/contracts/factory";
import { useSorobanReact } from "@soroban-react/core";
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
} from "@mui/material";
import { ConstellationToken } from "../../../types";
import { formatAddress } from "../../../utils";
import { Link } from "react-router-dom";

const ListToken = () => {
  const sorobanContext = useSorobanReact();
  const [tokens, setTokens] = useState<Array<ConstellationToken>>([]);
  useEffect(() => {
    const conn = async () => {
      const _tokens = await getTokenList(sorobanContext);
      setTokens(_tokens);
    };

    conn();
  }, []);

  const content = () => {
    if (tokens.length > 0) {
      return (
        <Table
          aria-label="simple table"
          sx={{
            "& .MuiTableCell-root": { color: "white" },
            "& .MuiTableRow-root": { borderBottom: "1px solid silver" },
          }}
        >
          <TableHead>
            <TableRow sx={{ color: "white" }}>
              <TableCell sx={{ color: "white" }}>Token</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>TVL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, i) => {
              return (
                <React.Fragment key={i}>
                  <TableRow>
                    <TableCell>{token.symbol}</TableCell>
                    <TableCell>
                      {formatAddress(token.address.toString())}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Link to={`/products/${token.address}`}>Details</Link>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}

          {/* For other variants, adjust the size with `width` and `height` */}
          {/* <Skeleton sx={{backgroundColor:'grey', width:'100%'}} variant="circular" width={40} height={40} /> */}
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
          width: "55%",
          backgroundColor: "#13141E",
          borderRadius: "25px",
          border: "1px solid #824f87",
          minHeight: "65%",
        }}
      >
        <CardHeader
          title="Token List"
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
            {/* <Table
              aria-label="simple table"
              sx={{
                "& .MuiTableCell-root": { color: "white" },
                "& .MuiTableRow-root": { borderBottom: "1px solid silver" },
              }}
            >
              <TableHead>
                <TableRow sx={{ color: "white" }}>
                  <TableCell sx={{ color: "white" }}>Token</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>TVL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((token, i) => {
                  return (
                    <React.Fragment key={i}>
                      <TableRow>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell>
                          {formatAddress(token.address.toString())}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <Link to={`/products/${token.address}`}>Details</Link>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table> */}
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default ListToken;
