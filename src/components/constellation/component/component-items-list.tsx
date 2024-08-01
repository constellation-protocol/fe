import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Token } from "./type"
import React from "react"
import { formatAddressLong } from "../../../utils"


interface Props {
    components: Array<Token>
}
const ComponentItemsList = ({components}: Props) => {
    return (<>
      <List sx={{
          maxHeight: '25vh',  // Increase to 30vh for better usability
          overflowY: 'auto',   // Enable vertical scrolling
            }}>
        {
            components.map((c,i) => {
                return <React.Fragment key={i}>
                   <ListItem key={i} sx={{backgroundColor:'red'}}>
                     <ListItemText primary={c.name} secondary={
                        <>
                        <Box sx={{display:'flex', gap:3}}>
                            <Typography>{c.symbol}</Typography>
                            <Typography>{formatAddressLong(c.address)}</Typography>
                        </Box>
                        </>
                     }/>                
                        </ListItem>
                                                <Divider/>
                </React.Fragment>
            })
        }
      </List>
    </>)
}

export default ComponentItemsList
