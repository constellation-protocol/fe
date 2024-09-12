import { Box, Button, styled, Typography } from "@mui/material";
import { SwapStatus } from "./common";

interface Props {
  address: string;
  paymentAmount: number;
  allowance: number;
  balance: number;
  inputTokenSelected: boolean;
  outputTokenSelected: boolean;
  swapStatus: SwapStatus;
  swap: () => void;
  approve: () => void;
}

interface InfoProps {
  text: string;
}

interface CustomButtonProps {
  text: string;
  onClick: () => void;
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

const StyledButton = styled(Button)(({ theme }) => ({
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

const Info = ({ text }: InfoProps) => (
  <StyledBox>
    <StyledText>{text}</StyledText>{" "}
  </StyledBox>
);

const CustomButton = ({ text, onClick }: CustomButtonProps) => (
  <StyledButton fullWidth onClick={onClick}>
    <Typography sx={{ color: "white",  }}>{text}</Typography>
  </StyledButton>
);

const SwapAction = ({
  address,
  paymentAmount,
  allowance,
  balance,
  inputTokenSelected,
  outputTokenSelected,
  swapStatus,
  swap,
  approve,
}: Props) => {

  if (!address)return <Info text="Connect Wallet"/>
  if (!inputTokenSelected) return <Info text="Select Input Token"/>
  if (!outputTokenSelected)return <Info text="Select Output Token"/>;
  if(swapStatus === SwapStatus.swapping || swapStatus === SwapStatus.swap_completing) return <Info text="Swapping" />
  if(swapStatus === SwapStatus.approving || swapStatus === SwapStatus.approve_completing) return <Info text="Approving" />
  if (balance === 0 || paymentAmount > balance) return <Info text="Insufficient Balance"/>;
  if (paymentAmount === 0) return <Info text="Enter amount"/>;
  if (paymentAmount > allowance) {
    return <CustomButton text="Approve" onClick={approve} />;
  } else if (paymentAmount <= allowance) {
    return <CustomButton text="Swap" onClick={swap} />;
  }
};

export default SwapAction;
