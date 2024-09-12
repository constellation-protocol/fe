import { Box, Stack, Typography } from "@mui/material";
import FormButton from "../common/form-button";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";

const Index = () =>  {
  
   const navigate = useNavigate();


  return(<><Box className="index" sx={{ height: "100%", width: "100%" }}>
    hello
    <img
      style={{
        width: "auto",
        height: "85%",

        position: "absolute",
        bottom: 0,
        left: -190,
        opacity: 0.22,  
      }}
      src="/bg/no-bg.png"
    />

  

<Stack sx={{width:'100%',position: "absolute",bottom:'30%', padding:'0', left:'25%', gap:'5px'}}>
       <Box> <Typography sx={{fontSize:'55px', color: 'white', textTransform:'uppercase', fontFamily:'NeueHaasLight'}}>Constellation Protocol</Typography></Box>
        <Box><Typography sx={{fontSize:'25px', color: 'white', fontFamily:'NeueHaasLight'}}>Your Gateway to Stellar Assets.</Typography></Box>
        
        <Box sx={{width:'200px'}}><FormButton text="Explore" onClick={() => navigate('/swap')}/></Box>
        <Box>
        <a href="https://github.com/constellation-protocol/constellation-protocol" target="_blank" rel="noopener noreferrer">
        <GitHubIcon sx={{ color: 'white', cursor: 'pointer' }} />
      </a>
        </Box>
        
    </Stack>
    
  
  
  </Box>
  </>)
};

export default Index;
