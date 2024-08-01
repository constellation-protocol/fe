import { Paper, TextField, Container, Card, CardHeader, Typography, CardContent, Stack, Button, Chip, IconButton, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { isConnected } from "@stellar/freighter-api";
import { get_factory_address } from "../../../chain/router";
import usePublicKey from "../../../hooks/usePublicKey";
import { useSorobanReact } from "@soroban-react/core";
import SorobanReactConnectButton from "../wallet/soroban-react-connect";
import SorobanReactWalletData from "../wallet/soroban-react-wallet-data";
import { contractInvoke } from "@soroban-react/contracts";
// import { addressToScVal, scValToJs } from 'helpers/convert';
import { xdr } from "@stellar/stellar-sdk";
import { scValToJs } from "../../../helpers/convert";
import ComponentInput from "../component/component-input";
import ComponentItemsList from "../component/component-items-list";
import { Token } from "../component/type";
import ComponentForm from "../component/component-form";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
const CreateToken = () => {
  // const {activeChain, server, address, connect, disconnect} = useSorobanReact()

  // if(!address) {
  //    connect();
  // }

  //   const { publicKey } = usePublicKey();
  useEffect(() => {
    const conn = async () => {
      // await get_factory_address(publicKey)

      let response = await contractInvoke({
        contractAddress:
          "CA4FI3YVUE2UGPQVCDL7DDUDPQSKGHDXFIU54HBDJ5XJUMG2CE5GZA46",
        method: "get_factory_address",
        // args: [new StellarSdk.Address(account).toScVal(), amountScVal],
        sorobanContext,
        signAndSend: false,
        // secretKey: admin_account.secret(),
      });

      const pairAddress = scValToJs(response as xdr.ScVal) as string;
    };

    // conn();
  }, []);

  const sorobanContext = useSorobanReact();

  const [name, setName] = useState("");
  const [open, setOpenComponents] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };
   
  const [components, setComponets] = useState<Array<Token>>([]);

  const handleTokenInfo = (token: Token) => {
   console.log(token)
       components.push(token)
       setComponets([...components])
  }
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          height: "100%",
          width: "60%",
          margin: "0 auto",
          marginTop: "-50px",
          paddingTop:'20px',
         //  display: "flex",
         //  justifyContent: "center",
      
        }}
      >
         <CardHeader  title="Create Constellation"></CardHeader>
  
         
        {/* <Box
      component="form"
      // sx={{
      //   '& > :not(style)': { m: 1, width: '25ch' },
      // }}
      noValidate
      // autoComplete="off"
    > */}
       <Box 
       component="form"
       noValidate 
      autoComplete="off"
       sx={{ 
       
          width: "100%",
          display:'flex',
         justifyContent: 'center',
         alignContent: 'center',
         flexDirection: 'column',
         gap: 2, // Optional: Adds space between each textbox
         // padding:'20px',
         boxSizing: 'border-box',
         }}>
       <Box>
         
         <TextField
           // name="text"
           type="text"
           // id="outlined-basic"
           label="Name"
           variant="outlined"
           required
           value={name}
           inputProps={{ readOnly: false }}
           onChange={(e) => setName(e.target.value)}
           sx={{
            width: "55%",
            '& .MuiOutlinedInput-root': {
               borderRadius: '14px', 
               // height: '10px', 
               fontWeight: 600, 
             },
             '& .MuiInputLabel-root': {
               fontWeight: 600, 
             },
           }}
           InputProps={{
            style: { 
              fontWeight: 500,  
            },
            
          }} 
         />
         </Box>
        <Box>
         
        <TextField
          // name="text"
          type="text"
          id="outlined-basic"
          label="Symbol"
          variant="outlined"
          required
          value={name}
          inputProps={{ readOnly: false }}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "55%",
            '& .MuiOutlinedInput-root': {
               borderRadius: '14px', 
               height: '56px', 
               fontWeight: 600, 
             },
             '& .MuiInputLabel-root': {
               fontWeight: 600, 
             },
           }}
           InputProps={{
            style: {
               // height: '60px',  
              fontWeight: 500, 
            //   fontSize:'25px'
            },
            
          }}
          
         //  helperText={!name ? "Require" : "Do not share your password"}
        />
        </Box>
        <Box>
         
         <TextField
           // name="text"
           type="number"
           id="outlined-basic"
           label="Decimal"
           variant="outlined"
           required
           value={name}
           inputProps={{ readOnly: false }}
           onChange={(e) => setName(e.target.value)}
           sx={{
             width: "55%",
             '& .MuiOutlinedInput-root': {
                borderRadius: '14px', 
                height: '56px', 
                fontWeight: 600, 
              },
              '& .MuiInputLabel-root': {
                fontWeight: 600, 
              },
            }}
            InputProps={{
             style: {
               // height: '60px', 
               fontWeight: 500, 
               // fontSize:'25px'
             },
             
           }} 
         />
         </Box>
         <Box>
         
         <TextField
           // name="text"
           type="text"
           id="outlined-basic"
           label="Manager Address"
           variant="outlined"
           required
           value={name}
           inputProps={{ readOnly: false }}
           onChange={(e) => setName(e.target.value)}
           sx={{
             width: "55%",
             '& .MuiOutlinedInput-root': {
                borderRadius: '14px', 
                height: '56px', 
                fontWeight: 600, 
              },
              '& .MuiInputLabel-root': {
                fontWeight: 600, 
              },
            }}
            InputProps={{
             style: {
               // height: '60px', 
               fontWeight: 500, 
               // fontSize:'25px'
             },
             
           }} 
         />
         </Box>

         <ComponentForm components={components} open={open}   onTokenInfo={handleTokenInfo} onClose={()=>setOpenComponents(false)}/>
       
         <Card sx={{
            width:'55%',
            margin: '0 auto',
      
         }}>
            <CardHeader  sx={{padding:'0px'}}  title="Components"
        subheader={components.length === 0 && "Click plus to add components to your Constellation"} action={
          components.length > 0 ? <Box sx={{padding:'2px 20px 0px 0px' /* top right bottom left */}}><IconButton onClick={() =>setOpenComponents(true)} ><AddIcon /></IconButton></Box> : <></>
        }>
          
            </CardHeader> 
            {components.length === 0 &&   <Button 
          onClick={()=>setOpenComponents(true)}
          sx={{
            width:'8%',
            height:'100%',
            border: '1px solid',  
            borderColor: 'grey.300',  
            borderRadius: '5px', 
            padding: '8px',  
            backgroundColor: 'background.paper',  
            '&:hover': {
              backgroundColor: 'grey.100',  
            },
          }}
          startIcon={<AddIcon/>}/>}
            
            
           <CardContent  sx={{ 
        }} >
           
           <Stack  direction="row" spacing={1} sx={{marginTop:'10px', flexWrap: 'wrap', gap:1,

maxHeight: '20vh',  // Increase to 30vh for better usability
overflowY: 'auto',   // Enable vertical scrolling
           }}> 
            {
               components.map(component =><Chip label={component.symbol} variant="outlined" onDelete={()=>{}} /> )
            }
           </Stack>
           </CardContent>
         </Card>
         
       </Box> 
       <CardActions sx={{margin:'0 auto'}}>
       <Button
 
      fullWidth
      sx={{
         margin:'0 auto',
        "&.Mui-disabled": {
          color: "silver", // Change this to your desired color
        },
        font: "Neue Haas Grotesk Display Pro",
        fontSize: "25px",
         backgroundColor: "red",
        width: "55%",
        height: "60px",
        borderRadius: 0,
        boxShadow: "none",
        "&:hover": {
         //  backgroundColor: "#FFFFFF", 
          boxShadow: "none", // Remove box shadow on hover
        },
        "&:active": {
          boxShadow: "none", // Remove box shadow on active state as well
        },
      }}
     
    >
      CREATE
    </Button>
         </CardActions>
      </Card>
    </>
  );
};

export default CreateToken;
