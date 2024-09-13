import {
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Mint from "./mint";
import Redeem from "./redeem";
import { useSorobanReact } from "@soroban-react/core";
import { getTokenUserBalanceList } from "../../../chain/contracts/token";
import { Address } from "@stellar/stellar-sdk";
import { ConstellationUserBalance, TokenUserBalance } from "../../../types";
import { getUserConstellationDetails } from "../../../chain/contracts/constellation_token";

enum View {
  mint,
  redeem,
}
const Swap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // max-width: 599.95px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // min-width: 600px and max-width: 899.95px
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg")); // min-width: 900px and max-width: 1199.95px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg")); // min-width: 1200px

  const getMainCardWidth = () => {
    if (isLargeDesktop || isDesktop) return "500px";
    else if (isTablet) return "60%";
    else if (isMobile) return "90%";
  };

  const [view, setView] = useState<View>(View.mint);

  const [constellationTokens, setConstellationTokens] = useState<
    Array<ConstellationUserBalance>
  >([]);
  const [paymentTokens, setPaymentTokens] = useState<Array<TokenUserBalance>>(
    [],
  );
  const [loadingConstellationTokens, setLoadingConstellationTokens] =
    useState<boolean>(true);
  const [loadingPaymentTokens, setLoadingPaymentTokens] =
    useState<boolean>(true);
  const sorobanContext = useSorobanReact();
  useEffect(() => {
    const get = async () => {
      const address = sorobanContext.address;
      const constellationTokens = await getUserConstellationDetails(
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

      setLoadingConstellationTokens(false);
      setLoadingPaymentTokens(false);
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
          loadingConstellationTokens={loadingConstellationTokens}
          loadingPaymentTokens={loadingPaymentTokens}
        />
      );
    }
    {
      return (
        <Redeem
          switchView={() => setView(View.mint)}
          paymentTokens={paymentTokens}
          constellationTokens={constellationTokens}
          loadingConstellationTokens={loadingConstellationTokens}
          loadingPaymentTokens={loadingPaymentTokens}
        />
      );
    }
  };
  return (
    <>
      <Card
        sx={{
          width: getMainCardWidth(),
          border: "2px solid",
          borderColor: "#824f87",
          borderRadius: "25px",
          backgroundColor: "#13141E",
          color: "silver",
          margin: "0 auto",
          paddingBottom: "20px",
        }}
      >
        <CardHeader
          sx={{ textAlign: "center", fontFamily: "NeueHaasLight" }}
          title="Swap"
        ></CardHeader>
        <CardContent sx={{ position: "relative" }}>{getView()}</CardContent>
      </Card>
    </>
  );
};

export default Swap;
