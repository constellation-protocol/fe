import { Box, Card, Dialog,CardHeader,CardContent, DialogTitle, DialogContent } from "@mui/material"
import ComponentInput from "./component-input"
import ComponentItemsList from "./component-items-list"
import { Token } from "./type";


export interface Props {
    open: boolean;
    components: Array<Token>;
    onClose: () => void;
    onTokenInfo:(token: Token) => void
  }

const ComponentForm = ({open,components,  onClose, onTokenInfo}:Props) => {

   return(<Dialog fullWidth  onClose={() => onClose()} open={open}>
        <DialogTitle sx={{margin:'0 auto'}}>Add Components to your token</DialogTitle>
     
           <DialogContent sx={{height:'40vh'}}>
           <Box sx={{padding:'20px'}}>
             <ComponentInput onTokenInfo={(token)=>onTokenInfo(token)}/>
             </Box>
           <Box sx={{padding:'10px 20px'}} >
            <ComponentItemsList components={components}/>
           </Box>
           </DialogContent>
     
   </Dialog>)
}

export default ComponentForm