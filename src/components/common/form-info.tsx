import { Box, styled, Typography } from "@mui/material";


interface InfoProps {
    text: string;
  }
  
 
  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#212637",
    width: "100%",
    padding: "18px 20px",
    borderRadius: "20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  }));
  
  const StyledText = styled(Typography)(({ theme }) => ({
    color: "#878891",
    fontSize: "18px",
    fontWeight: "bold",
  }));
  
 
  const FormInfo = ({ text }: InfoProps) => (
    <StyledBox>
      <StyledText>{text}</StyledText>{" "}
    </StyledBox>
  );

  export default FormInfo
  
 