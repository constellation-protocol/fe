import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ComponentInput from "./component-input";
import ComponentItemsList from "./component-items-list";
import { useContext } from "react";
import CreateConstellationContext from "../create/context/context";

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
      /* onClose={() => onClose()}  */ open={open}
      sx={{
        "& .MuiDialog-paper": {
          color: "silver",
          width: "35%",
          maxWidth: "80%",
          border: "2px solid",
          borderColor: "#291c44",
          borderRadius: "25px",
        },
      }}
    >
      <DialogTitle
        sx={{
          margin: "0 auto",
          color: "silver",
          backgroundColor: "#16181b",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Components
      </DialogTitle>
      <Box sx={{ backgroundColor: "#16181b", padding: "0px 50px" }}>
        <ComponentInput />
      </Box>
      <DialogContent sx={{ height: "40vh", backgroundColor: "#16181b" }}>
        <Box sx={{ padding: "10px 24px" }}>
          <ComponentItemsList />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#16181b",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgoundColor: "#16181b",
            borderRadius: "10px",
            padding: "10px 10px",
            marginBottom: "10px",
            width: "85%",
            backgroundColor: "#7851D8",
          }}
          onClick={() => handleConfirm()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComponentForm;
