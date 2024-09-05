import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WalletButton from "../constellation/wallet/connect-wallet";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 ",
          margin: "0",
          boxShadow: "none",
          width: "100%",
          height: "100px",
          backgroundColor: "#0F1017",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ padding: "0 !important", width: "100%" }}
        >
          <Toolbar
            disableGutters
            sx={{
              padding: "0",
              display: "flex",
              position: "relative",
              justifyContent: "space-around",
              alignItems: "center",
              alignContent: "center",
              paddingTop: "10px",
            }}
          >
            <Box>
              <Link to="/">
                <Typography>Logo</Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                textDecoration: "none",
                gap: "20px",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "flex-start",
                backgroundColor: "#181A25",
                padding: "6px 20px",
                borderRadius: "35px",
              }}
            >
              <NavLink
                to="/create"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: isActive ? "#8865DD" : "transparent",
                  padding: "6px 20px",
                  borderRadius: "35px",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                <Typography>Create Index</Typography>
              </NavLink>
              <NavLink
                to="/products"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: isActive ? "#8865DD" : "transparent",
                  padding: "6px 20px",
                  borderRadius: "35px",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                <Typography>Products</Typography>
              </NavLink>
              <NavLink
                to="/swap"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: isActive ? "#8865DD" : "transparent",
                  padding: "6px 20px",
                  borderRadius: "35px",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                <Typography>Swap</Typography>
              </NavLink>
            </Box>
            <Box>
              <WalletButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Nav;
