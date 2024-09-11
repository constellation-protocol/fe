import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Tab,
  Typography,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import Mint from "./mint";
import Redeem from "./redeem";
import { getConstellationUserBalance } from "../../../chain/contracts/factory";
import { useSorobanReact } from "@soroban-react/core";
import { getTokenUserBalanceList } from "../../../chain/contracts/token";
import { Address } from "@stellar/stellar-sdk";
import { ConstellationUserBalance, TokenUserBalance } from "../../../types";
import {
  getConstellationComponents,
  getUserConstellationDetails,
} from "../../../chain/contracts/constellation_token";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

enum View {
  mint,
  redeem,
}
const Swap = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [view, setView] = useState<View>(View.mint);

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
      const constellationTokens = await getUserConstellationDetails(
        //getConstellationUserBalance(
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

  const getView = () => {
    if (view === View.mint) {
      return (
        <Mint
          switchView={() => setView(View.redeem)}
          paymentTokens={paymentTokens}
          constellationTokens={constellationTokens}
        />
      );
    }
    {
      return (
        <Redeem
          switchView={() => setView(View.mint)}
          paymentTokens={paymentTokens}
          constellationTokens={constellationTokens}
        />
      );
    }
  };
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
        <CardHeader title="Swap"></CardHeader>
        <CardContent sx={{ position: "relative" }}>
          {/* <Chip sx={{position:'absolute',right:'180px'}} avatar={<UnfoldMoreIcon>M</UnfoldMoreIcon>} label="Avatar" /> */}
          {getView()}
        </CardContent>
      </Card>
    </>
  );
};

export default Swap;

/**
 *  -1,2,3
 * 
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';

import SwapVertIcon from '@mui/icons-material/SwapVert';

import SyncIcon from '@mui/icons-material/Sync';

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import ImportExportIcon from '@mui/icons-material/ImportExport';

import HeightIcon from '@mui/icons-material/Height';

import SouthIcon from '@mui/icons-material/South';

 */
