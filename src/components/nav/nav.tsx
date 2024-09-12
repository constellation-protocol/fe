import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WalletButton from "../constellation/wallet/connect-wallet";
import { NavLink } from "react-router-dom";
import RocketIcon from '@mui/icons-material/Rocket';

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
           <Link to="/" style={{position:'absolute', left:'100px', top:'20%',zIndex:'5000' , textDecoration:'none'}}>
              <Stack direction={"row"} sx={{gap:'10px'}}>
              <RocketIcon sx={{color:'#8866DD', fontSize:'60px', border:'1 solid red',}}/>
                 <Stack direction={"column"} sx={{gap:'0'}}>
                 <Typography sx={{textDecoration:'none', fontSize:'23px', color: '#fff', fontFamily:'NeueHaasLight'}}>Constellation</Typography> 
                 <Typography sx={{textDecoration:'none', fontSize:'23px', color:'#8866DD', mt: '-10px', fontFamily:'NeueHaasLight'}}>Protocol</Typography> 
                 </Stack>
              </Stack>
              </Link>
        <Container
          maxWidth="xl"
          
          sx={{ padding: "0 !important", width: "100%", position: "relative" }}
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
              fontFamily:'NeueHaasLight'
            }}
          >
            <Box>
              
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
                <Typography sx={{fontFamily:'NeueHaasLight'}}>Swap</Typography>
              </NavLink>
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
                <Typography sx={{fontFamily:'NeueHaasLight'}}>Create Index</Typography>
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
                <Typography sx={{fontFamily:'NeueHaasLight'}}>Products</Typography>
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
