import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useTheme,
  useMediaQuery,
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

const ComponentForm = ({ open }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg")); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg")); // min-width: 1200px

  const getMainCardWidth = () => {
    if (isLargeDesktop || isDesktop) return "500px";
    else if (isTablet) return "60%";
    else if (isMobile) return "90%";
  };

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
          width: getMainCardWidth(),
          border: "1px solid",
          borderColor: "#824f87",
          borderRadius: "25px",
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
      <DialogContent
        sx={{ padding: "0 20px", height: "40vh", backgroundColor: "#13141E" }}
      >
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
          padding: "0px 20px 20px",
        }}
      >
        <FormButton text={"Add Components"} onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ComponentForm;
