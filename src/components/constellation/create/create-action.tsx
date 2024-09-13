import { Button } from "@mui/material";
import FormInfo from "../../common/form-info";

interface Props {
  walletConnected: boolean;
  hasName: boolean;
  hasSymbol: boolean;
  hasDecimal: boolean;
  hashManager: boolean;
  hashComponents: boolean;
  handleCreate: () => void;
}

const CreateAction = ({
  walletConnected,
  hasName,
  hasSymbol,
  hasDecimal,
  hashManager,
  hashComponents,
  handleCreate,
}: Props) => {
  if (!walletConnected) return <FormInfo text="Connect Wallet" />;
  if (!hasName) return <FormInfo text="Enter Name" />;
  if (!hasSymbol) return <FormInfo text="Enter Symbol" />;
  if (!hasDecimal) return <FormInfo text="Enter Decimal" />;
  if (!hasDecimal) return <FormInfo text="Enter Decimal" />;
  if (!hashManager) return <FormInfo text="Enter Manager Wallet Address" />;
  if (!hashComponents) return <FormInfo text="Select Components" />;

  return (
    <>
      <Button
        variant="contained"
        onClick={handleCreate}
        fullWidth
        sx={{
          padding: "0px",
          margin: "0 auto",
          backgroundColor: "#7851D8",
          "&.Mui-disabled": {
            color: "silver",
          },
          font: "Neue Haas Grotesk Display Pro",

          width: "100%",
          height: "60px",
          borderRadius: "20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#7851D8",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#7851D8",
          },
        }}
      >
        CREATE
      </Button>
    </>
  );
};

export default CreateAction;
