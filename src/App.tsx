import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateToken from "./components/constellation/create/create";
import Nav from "./components/nav/nav";
import ListToken from "./components/constellation/list/list";
import MintToken from "./components/constellation/mint/mint";
import Rebalance from "./components/constellation/rebalance/rebalance";
import RedeemToken from "./components/constellation/redeem/redeem";
import Registry from "./components/constellation/registry/registry";
import ConstellationLayout from "./components/constellation/layout";
import "./App.css";
import { TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const [name, setName] = useState("YUSUF");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  return (
    <>
      <TextField name="user" type="text" value={name} onChange={handleChange} />
      <Nav />

      <Routes>
        <Route element={<ConstellationLayout />}>
          <Route path="/create" element={<CreateToken />} />
          <Route path="/products" element={<ListToken />} />
          <Route path="/mint" element={<MintToken />} />
          <Route path="/rebalance" element={<Rebalance />} />
          <Route path="/redeem" element={<RedeemToken />} />
          <Route path="/registry" element={<Registry />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
