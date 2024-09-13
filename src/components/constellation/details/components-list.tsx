import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Component } from "../../../types";
import { formatAddress } from "../../../utils";

interface Props {
  tokens: Array<Component>;
}
const ComponentsList = ({ tokens }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");

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

  return (
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
              fontFamily: "NeueHaasLight",
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
            <Table
              aria-label="simple table"
              sx={{
                "& .MuiTableCell-root": { color: "white" },
                "& .MuiTableRow-root": { borderBottom: "1px solid silver" },
              }}
            >
              <TableHead>
                <TableRow sx={{ color: "white" }}>
                  <TableCell sx={{ color: "white" }}>
                    <Typography sx={{ fontFamily: "NeueHaasLight" }}>
                      Component
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontFamily: "NeueHaasLight" }}>
                      Address
                    </Typography>
                  </TableCell>
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
                        <TableCell>
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
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

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
};

export default ComponentsList;
