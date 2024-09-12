import { useSorobanReact } from "@soroban-react/core";
import { ConnectButton } from "@soroban-react/connect-button";

function SorobanReactConnectButton() {
  const sorobanContext = useSorobanReact();

  return (
    <div>
      <div>
        <p>@soroban-react/connect-button:</p>
      </div>
      <ConnectButton
        label="Connect your Wallet"
        sorobanContext={sorobanContext}
      />
    </div>
  );
}

export default SorobanReactConnectButton;
