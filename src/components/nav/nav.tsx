import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WalletButton from "../constellation/wallet/connect-wallet";

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          padding: "0",
          margin: "0",
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
          height: "10%",
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "absolute", left: 40 }}>
              <Link to="/">
                <Typography>Logo</Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                textDecoration: "none",
                gap: "20px",
                alignItems: "space-between",
                justifyContent: "space-between",
                flexDirection: "flex-start",
              }}
            >
              <Link to="/create" style={{ textDecoration: "none" }}>
                <Typography>Create Index</Typography>
              </Link>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Typography>Products</Typography>
              </Link>
              <Link to="/mint" style={{ textDecoration: "none" }}>
                <Typography>Mint</Typography>
              </Link>
              <Link to="/rebalance" style={{ textDecoration: "none" }}>
                <Typography>Rebalance</Typography>
              </Link>
              <Link to="/redeem" style={{ textDecoration: "none" }}>
                <Typography>Redeem</Typography>
              </Link>
              <Link to="/registry" style={{ textDecoration: "none" }}>
                <Typography>Registry</Typography>
              </Link>
              <Box>
                <WalletButton />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Nav;
