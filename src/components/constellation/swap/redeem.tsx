import { Box, Button, Container, Stack } from "@mui/material";
import TokenInfo from "./token-info";
import { TokenUserBalance } from "../../../types";
import { useEffect, useState } from "react";

interface Props {
  paymentTokens: Array<TokenUserBalance>;
  constellationTokens: Array<TokenUserBalance>;
}

const Redeem = ({ paymentTokens, constellationTokens }: Props) => {
  const [paymentToken, setPaymentToken] = useState<TokenUserBalance>();
  const [constellationToken, setConstellationToken] =
    useState<TokenUserBalance>();
  const [paymentAmount, setPaymentAmount] = useState<Number>(0);
  const [constellationAmount, setConstellationAmount] = useState<Number>(0);
  useEffect(() => {
 
  }, [paymentToken, constellationToken, paymentAmount, constellationAmount]);

  return (
    <>
      <Container>
        <Stack direction={"column"} sx={{ gap: "14px" }}>
          <TokenInfo
            amount={constellationAmount}
            onAmountChange={setConstellationAmount}
            selectedToken={constellationToken}
            setSelectedToken={setConstellationToken}
            tokens={constellationTokens}
            label="Sell"
            showSelect={true}
          />
          <TokenInfo
            amount={paymentAmount}
            onAmountChange={setPaymentAmount}
            selectedToken={paymentToken}
            setSelectedToken={setPaymentToken}
            tokens={paymentTokens}
            label="Buy"
            showSelect={true}
          />
          <Box>
            <Button></Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Redeem;
