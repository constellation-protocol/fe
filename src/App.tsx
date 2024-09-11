// import './index.css';
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import ListToken from "./components/constellation/list/list";
import Rebalance from "./components/constellation/rebalance/rebalance";
import RedeemToken from "./components/constellation/redeem/redeem";
import Registry from "./components/constellation/registry/registry";
import ConstellationLayout from "./components/constellation/layout";
import CreateTokenIndex from "./components/constellation/create";
import ConstellationDetails from "./components/constellation/details/constellation-details";
import Swap from "./components/constellation/swap/swap";
import AstroSvg from "./components/common/astro";
import Index from "./components/constellation";

function App() {
  return (
    <>
      <>hello</>

      <Nav />
      <Routes>
        <Route element={<ConstellationLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateTokenIndex />} />
          <Route path="/products" element={<ListToken />} />
          <Route path="/products/:id" element={<ConstellationDetails />} />
          <Route path="/rebalance" element={<Rebalance />} />
          <Route path="/redeem" element={<RedeemToken />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/swap" element={<Swap />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
