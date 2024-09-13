import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Chip } from "@mui/material";

interface Props {
  onClick: () => void;
  symbol: string;
}
const SelectToken = ({ onClick, symbol }: Props) => {
  return (
    <Box onClick={() => onClick()}>
      <Chip
        sx={{
          color: "silver",
          cursor: "pointer",
          backgroundColor: "#212637", //"#fff",
          padding: "0 15px",
          flexDirection: "row-reverse",
        }}
        icon={<ExpandMoreIcon sx={{ color: "white" }} />}
        label={symbol || "Select Token"}
      />
    </Box>
  );
};

export default SelectToken;
