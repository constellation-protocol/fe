import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ConstellationLayout = () => {
  return (
    <>
      {/* <Box
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
      </Box> */}
      <Box
        sx={{
          margin: "150px auto",
          // bottom: "50px",
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          height: "100%",
          width: "100%",
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
