import { standalone, testnet, mainnet } from "@soroban-react/chains";
import { SorobanReactProvider } from "@soroban-react/core";
import { freighter } from "@soroban-react/freighter";
import { lobstr } from "@soroban-react/lobstr";
import { xbull } from "@soroban-react/xbull";
import { hana } from "@soroban-react/hana";
import { ChainMetadata, Connector, WalletChain } from "@soroban-react/types";
import useMounted from "../hooks/useMounted";
// import useMounted from 'hooks/useMounted';

// Set allowed chains:
// const chains: ChainMetadata[] =
//   process.env.NODE_ENV === 'production' ? [testnet, mainnet] : [standalone, testnet, mainnet];
const chains: ChainMetadata[] = [standalone, testnet, mainnet];
// Set chain by default:
// Helper function
const findWalletChainByName = (name: string): WalletChain | undefined => {
  return chains.find((chain) => chain.id === name);
};

// Get the active chain based on the environment variable or default to testnet
const activeChainName = testnet;
const activeChain: WalletChain = testnet; //findWalletChainByName(activeChainName) || testnet;

// Set allowed connectors
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
