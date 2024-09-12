import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import ListToken from "./components/constellation/list/list";
import RedeemToken from "./components/constellation/redeem/redeem";
import ConstellationLayout from "./components/constellation/layout";
import CreateTokenIndex from "./components/constellation/create";
import ConstellationDetails from "./components/constellation/details/constellation-details";
import Swap from "./components/constellation/swap/swap";
import Index from "./components/constellation";

import "./fonts/NeueHaasDisplayLight.ttf";
import "./fonts/NeueHaasDisplayThin.ttf";
import "./fonts/NeueHaasDisplayBold.ttf";

function App() {
  return (
    <>
      <Nav />
      <Routes>
      <Route path="/" element={<Index />} />
        <Route element={<ConstellationLayout />}>
          <Route path="/create" element={<CreateTokenIndex />} />
          <Route path="/products" element={<ListToken />} />
          <Route path="/products/:id" element={<ConstellationDetails />} />
          <Route path="/redeem" element={<RedeemToken />} />
          <Route path="/swap" element={<Swap />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
