import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import WalletButton from "../constellation/wallet/connect-wallet";
import { NavLink } from "react-router-dom";
import RocketIcon from '@mui/icons-material/Rocket';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from "./drawer";
 
const Nav = () => {

  const [drawerOpen, toggleDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg')); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')); // min-width: 1200px

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
    
          {(isDesktop || isLargeDesktop ) && 
            <Link to="/" style={{position:'absolute', left: '5%', top: '20%',zIndex:'5000' , textDecoration:'none'}}> 
            <Stack direction={"row"} sx={{gap: '10px',}}>
            <RocketIcon sx={{color:'#8866DD', fontSize: isMobile ? '40px' : '60px', border:'1 solid red',}}/>
               {!isMobile &&  
                 <Stack direction={"column"} sx={{gap:'0'}}>
                 <Typography sx={{textDecoration:'none', fontSize:'23px', color: '#fff', fontFamily:'NeueHaasLight'}}>Constellation</Typography> 
                 <Typography sx={{textDecoration:'none', fontSize:'23px', color:'#8866DD', mt: '-10px', fontFamily:'NeueHaasLight'}}>Protocol</Typography> 
                 </Stack>
               }  
                {isMobile && 
                  <MenuIcon onClick={()=>toggleDrawer(true)} sx={{fontSize:'40px', color:'silver'}}/>
               }           
            </Stack>
          </Link> 
          } 

          {(isTablet || isMobile) && <Stack direction={"row"} sx={{gap: '3px',position:'absolute', left: '15px', top:'35%',zIndex:'5000' }}>
              <Link to="/" style={{ textDecoration:'none'}}>
               <RocketIcon sx={{color:'#8866DD', fontSize:  '40px', border:'1 solid red',}}/>
                
                  </Link>   
                    <MenuIcon onClick={()=>toggleDrawer(true)} sx={{fontSize:'40px', color:'silver'}}/>          
              </Stack> 
          } 
          
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
           {(isDesktop || isLargeDesktop)  && <>
            <Box> </Box>
              <Box
                sx={{
                  display: "flex",
                  textDecoration: "none",
                  margin:'0 auto',
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
                  <Typography sx={{fontFamily:'NeueHaasLight'}}>Create Index {isMobile && <Typography sx={{fontSize:'200px', color:'red'}}>HELLO MOILE</Typography>} </Typography>
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
           </>
           }
            <Box sx={{position : 'absolute' , right: '3%' , top:(isMobile || isTablet) ? '40%' : 'none'}}>
              <WalletButton />
            </Box>
          </Toolbar>
          <MenuDrawer open={drawerOpen} close={()=>{toggleDrawer(false)}}/>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Nav; 