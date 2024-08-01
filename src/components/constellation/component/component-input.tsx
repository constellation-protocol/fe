import { Box, Button, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { contractInvoke } from "@soroban-react/contracts";
import { useSorobanReact } from "@soroban-react/core";
import { scValToJs } from "../../../helpers/convert";
import { xdr } from "@stellar/stellar-sdk";
import { getName, getSymbol } from "../../../chain/contracts/token";
import { Token } from "./type";


interface Props {

    onTokenInfo:(token: Token)=> void
}
const ComponentInput = ({onTokenInfo}: Props ) => {

    const sorobanContext = useSorobanReact();

    const handleTokenInfo = async () => {
        console.log('--> token: token')
       const address = 'CAFRU7ZYQFA3UG32YFZVBGN2PPMLCXEXJG45OF76ABREUSSPWNZBUFUJ'
       const name = await  getName(address, sorobanContext)
        
       const symbol = await  getSymbol(address, sorobanContext)
      console.log('name symbol ', name, symbol)
       onTokenInfo({
        name,
        symbol,
        address
       })
    
    };

    const handleAddress = (input:  string) => {
       console.log('input ',input)
    }

    return (
        <>
        <Box sx={{
            display: 'flex',
            alignContent: 'center',
            gap: '2%',
            justifyContent: 'center',
        }}>
        <TextField
           // name="text"
           type="text"
           id="outlined-basic"
           label="Component Address"
           variant="outlined"
           required
           value={name}
           inputProps={{ readOnly: false }}
           onChange={(e) => handleAddress(e.target.value)}
           sx={{
             width: "100%",
             '& .MuiOutlinedInput-root': {
                borderRadius: '14px', // Adjust border radius here
               // height: '56px', // Adjust height as needed
                fontWeight: 600, // Adjust font weight as needed
              },
              '& .MuiInputLabel-root': {
                fontWeight: 600, // Adjust label font weight as needed
              },
            }}
            InputProps={{
             style: {
              // height: '80px', // Adjust height as needed
               fontWeight: 500, // Adjust font weight as needed
            //    fontSize:'30px'
             },
             
           }} 
         />

          <Button 
          onClick={handleTokenInfo}
          sx={{
            width:'8%',
            height:'100%',
            border: '1px solid', // Adds a border
            borderColor: 'grey.300', // Color of the border
            borderRadius: '5px', // Makes the button corners rounded
            padding: '8px 16px', // Adds some padding
            backgroundColor: 'background.paper', // Background color similar to a paper element
            '&:hover': {
              backgroundColor: 'grey.100', // Slightly darker on hover for effect
            },
          }}
          startIcon={<AddIcon/>}/>
        </Box>
        </>
    )
}

export default ComponentInput