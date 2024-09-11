import { Box, Container } from "@mui/material";

const Index = () => (
  <Box className="index" sx={{ height: "100%", width: "100%" }}>
    hello
    <img
      style={{
        width: "auto",
        height: "100%",

        position: "absolute",
        top: 100,
        left: -190,
        opacity: 0.22, // Adjust the value to make the image faded (e.g., 0.5 for 50% opacity)
      }}
      src="/bg/no-bg.png"
    />
  </Box>
);

export default Index;
