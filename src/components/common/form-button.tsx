import { Button, styled, Typography } from "@mui/material";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
}

const StyledButton = styled(Button)(({}) => ({
  padding: "0px",
  margin: "0 auto",
  backgroundColor: "rgb(136, 102, 221)",
  borderRadius: "20px",
  width: "100%",
  height: "60px",
  font: "Neue Haas Grotesk Display Pro",
  textTransform: "capitalize",
  "&.Mui-disabled": {
    color: "silver",
  },
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#7851D8",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "rgb(136, 102, 221)",
  },
}));

const FormButton = ({ text, onClick }: CustomButtonProps) => (
  <StyledButton fullWidth onClick={onClick}>
    <Typography sx={{ color: "white", fontFamily: "NeueHaasLight" }}>
      {text}
    </Typography>
  </StyledButton>
);

export default FormButton;
