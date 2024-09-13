import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
     open: boolean;
    close: ()=>void
}

const StyledNavLink = styled(NavLink)(({  }) => ({
  textDecoration: 'none',
  
}));


const StyledListItemText = styled(ListItemText)(({   }) => ({
  
}));

const  MenuDrawer = ({ open, close}:Props) => {
 
  const DrawerList = (
    <Box sx={{ width: '100%', backgroundColor:'#13141F' }} role="presentation" onClick={()=>close()}>
      <List>
           <StyledNavLink
           to="/Swap" 
           style={({ isActive }) => ({ 
            color: isActive ? "white" : 'silver', 
          })}
           >
           <ListItem  disablePadding>
            <ListItemButton> 
              <StyledListItemText 
              sx={{
                 textDecoration:'none'
              }}
              primary={"Swap"} />
            </ListItemButton>
          </ListItem>
          </StyledNavLink>
          <StyledNavLink
           to="/create"
           style={({ isActive }) => ({ 
            color: isActive ? "white" : 'silver', 
          })}
           >
          <ListItem  disablePadding>
            <ListItemButton> 
              <StyledListItemText primary={"Create Index"} />
            </ListItemButton>
          </ListItem>
          </StyledNavLink>
          <StyledNavLink
           to="/products"
           style={({ isActive }) => ({ 
            color: isActive ? "white" : 'silver', 
          })}
           >
          <ListItem  disablePadding>
            <ListItemButton> 
              <StyledListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
          </StyledNavLink>
          <StyledNavLink
           to="https://github.com/constellation-protocol/constellation-protocol"
           target='_blank'
           rel='noopener noreferrer'
           style={({ isActive }) => ({ 
            color: isActive ? "white" : 'silver', 
          })}
           >
          <ListItem >
               <GitHubIcon sx={{ color: 'white', cursor: 'pointer' }} />
          </ListItem>
          </StyledNavLink>
      </List> 
    </Box>
  );

  return (
    <div>
      <Drawer anchor='bottom' open={open} onClose={()=>close()}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default MenuDrawer 