import { Box, Container, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  switchView: () => void;
  children: React.ReactNode;
}

const SwapContent = ({ switchView, children }: Props) => (
  <>
    <Container>
      <Stack direction={"column"} sx={{ gap: "12px", position: "relative" }}>
        <Box
          sx={{
            padding: "5px",
            position: "absolute",
            cursor: "pointer",
            backgroundColor: "#B4EFAF",
            top: "38%", // Positions the chip vertically in the center
            left: "50%", // Positions the chip horizontally in the center
            transform: "translate(-50%, -50%)", // Adjusts for the natural size of the chip so it's exactly in the center
            zIndex: 1, // Ensures the chip is above other elements
          }}
          onClick={() => switchView()}
        >
          <KeyboardArrowDownIcon
            sx={{
              borderRadius: "30px",
              color: "black",
              padding: "5px",
              position: "absolute",
              cursor: "pointer",
              backgroundColor: "#B4EFAF",
              top: "38%", // Positions the chip vertically in the center
              left: "50%", // Positions the chip horizontally in the center
              transform: "translate(-50%, -50%)", // Adjusts for the natural size of the chip so it's exactly in the center
              zIndex: 1, // Ensures the chip is above other elements
            }}
          />
        </Box>
        {children}
      </Stack>
    </Container>
  </>
);

export default SwapContent;
