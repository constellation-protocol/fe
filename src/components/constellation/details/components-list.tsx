import React from "react";
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
} from "@mui/material";
import { Component } from "../../../types";
import { formatAddress } from "../../../utils";

interface Props {
  tokens: Array<Component>;
}
const ComponentsList = ({ tokens }: Props) => (
  <>
    <Card
      sx={{
        backgroundColor: "#13141E",
        borderRadius: "25px",
        border: "1px solid #291c44",
      }}
    >
      <CardHeader
        title="Components"
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
          sx={{ maxWidth: "100%", backgroundColor: "#13141E", color: "white" }}
        >
          <Table
            aria-label="simple table"
            sx={{
              "& .MuiTableCell-root": { color: "white" },
              "& .MuiTableRow-root": { borderBottom: "1px solid silver" },
            }}
          >
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell sx={{ color: "white" }}>Component</TableCell>
                <TableCell>Address</TableCell>
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
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </>
);

export default ComponentsList;
