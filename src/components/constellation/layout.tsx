import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ConstellationLayout = () => {
  return (
    <>
      <Box
        sx={{
          bottom: "50px",
          width: "100%",
          position: "absolute",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet context={{}} />
      </Box>
    </>
  );
};

export default ConstellationLayout;
