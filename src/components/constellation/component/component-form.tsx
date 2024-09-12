import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import ComponentInput from "./component-input";
import ComponentItemsList from "./component-items-list";
import { useContext } from "react";
import CreateConstellationContext from "../create/context/context";
import FormButton from "../../common/form-button";

export interface Props {
  open: boolean;
  onClose: () => void;
}

const ComponentForm = ({ open, onClose }: Props) => {
  const { components, setOpenComponentForm, setError } = useContext(
    CreateConstellationContext,
  );

  const handleConfirm = () => {
    let isInvalid = false;
    components.forEach((component, index) => {
      if (component.amount <= 0) {
        setError(true, index);
        isInvalid = true;
      }
    });

    if (isInvalid) return;

    setOpenComponentForm(false);
  };

  return (
    <Dialog
      fullWidth
       open={open}
      sx={{
        "& .MuiDialog-paper": {
          color: "silver",
          width: "35%",
          maxWidth: "80%",
          border: "1px solid",
          borderColor: "#824f87",
          borderRadius: "25px",
          "@media (min-width: 1440px)": {
            width: "600px", // Set the width to 500px on wide screens (like desktop monitors)
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "silver",
          backgroundColor: "#13141E",
          width: "100%",
          textAlign: "center",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
       <Typography> Add Components to your Asset</Typography>
      </DialogTitle>
      <Box sx={{ backgroundColor: "#13141E", padding: "0px 20px" }}>
        <ComponentInput />
      </Box>
      <DialogContent sx={{padding:'0 20px', height: "40vh", backgroundColor: "#13141E" }}>
        <Box sx={{ padding: "5px 0px" }}>
          <ComponentItemsList />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#16181b",
          padding:'0px 20px 20px'
        }}
      >
        <FormButton
          text={'Add Components'}
          onClick={handleConfirm}
        /> 
      </DialogActions>
    </Dialog>
  );
};

export default ComponentForm;
