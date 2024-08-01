import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ConstellationLayout = () => {
  return (
    <>
      <Box
        sx={{
          height: "75%",
          bottom: "0",
          width: "100%",
          backgroundColor: "#F1F1F3",
          position: "absolute",
        }}
      >
        {/* <Box sx={{ height:'75%',bottom:'0', width:'100%', backgroundColor:'#F1F1F3', display:'flex'}}> */}
        <Outlet context={{}} />
      </Box>
    </>
  );
};

export default ConstellationLayout;
