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
          cursor: "pointer",
          backgroundColor: "#fff",
          padding: "0 15px",
          flexDirection: "row-reverse",
        }}
        icon={<ExpandMoreIcon />}
        label={symbol || "Select Token"}
      />
    </Box>
  );
};

export default SelectToken;
