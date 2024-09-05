import { Card, CardContent, CardHeader, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import Mint from "./mint";
import Redeem from "./redeem";
import { getConstellationUserBalance } from "../../../chain/contracts/factory";
import { useSorobanReact } from "@soroban-react/core";
import { getTokenUserBalanceList } from "../../../chain/contracts/token";
import { Address } from "@stellar/stellar-sdk";
import { ConstellationUserBalance, TokenUserBalance } from "../../../types";
import { getConstellationComponents, getUserConstellationDetails } from "../../../chain/contracts/constellation_token";

const Swap = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [constellationTokens, setConstellationTokens] = useState<
    Array<ConstellationUserBalance>
  >([]);
  const [paymentTokens, setPaymentTokens] = useState<Array<TokenUserBalance>>(
    [],
  );
  const sorobanContext = useSorobanReact();
  useEffect(() => {
    const get = async () => {


      const address = sorobanContext.address;
       // getUserConstellationDetails
      const constellationTokens = await getUserConstellationDetails( //getConstellationUserBalance(
        address as string,
        sorobanContext,
      );
      const xlm = import.meta.env.VITE_XLM;
      const paymentTokens = await getTokenUserBalanceList(
        address as string,
        [Address.fromString(xlm)],
        sorobanContext,
      );
      setConstellationTokens(constellationTokens);
      setPaymentTokens(paymentTokens); 
    };
    get();
  }, [sorobanContext.address]);
  return (
    <>
      <Card
        sx={{
          width: "40%",
          border: "2px solid",
          borderColor: "#824f87",
          borderRadius: "25px",
          backgroundColor: "#13141E",
          color: "silver",
          margin: "0 auto",
          paddingBottom: "20px",
        }}
      >
        <CardHeader></CardHeader>
        <CardContent>
          <TabContext value={activeTab}>
            <TabList onChange={(e, val) => setActiveTab(val)}>
              <Tab label="Mint" value="1" />
              <Tab label="Redeem" value="2" />
            </TabList>
            <TabPanel value="1">
              <Mint
                paymentTokens={paymentTokens}
                constellationTokens={constellationTokens}
              />
            </TabPanel>
            <TabPanel value="2">
              <Redeem
                paymentTokens={paymentTokens}
                constellationTokens={constellationTokens}
              />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  );
};

export default Swap;

/**
 *  -1,2,3
 */