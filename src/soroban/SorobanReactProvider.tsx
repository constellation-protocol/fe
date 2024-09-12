import { standalone, testnet, mainnet } from "@soroban-react/chains";
import { SorobanReactProvider } from "@soroban-react/core";
import { freighter } from "@soroban-react/freighter";
import { lobstr } from "@soroban-react/lobstr";
import { xbull } from "@soroban-react/xbull";
import { hana } from "@soroban-react/hana";
import { ChainMetadata, Connector, WalletChain } from "@soroban-react/types";
import useMounted from "../hooks/useMounted";

const chains: ChainMetadata[] = [standalone, testnet, mainnet];

const activeChain: WalletChain = testnet; 

export const walletConnectors: Connector[] = [
  freighter(),
  xbull(),
  lobstr(),
  hana(),
];

export default function MySorobanReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <SorobanReactProvider
      autoconnect={false}
      chains={chains}
      connectors={walletConnectors}
      activeChain={activeChain}
    >
      {children}
    </SorobanReactProvider>
  );
}
