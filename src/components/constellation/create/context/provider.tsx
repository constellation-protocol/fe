import { useState } from "react";
import CreateConstellationContext from "./context";
import { FormComponent } from "../../component/type";

const CreateConstellationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openComponentForm, setOpenComponentForm] = useState<boolean>(false);
  const [components, setTokens] = useState<Array<FormComponent>>([]);

  const removeToken = (index: number) => {
    components.splice(index, 1);

    setTokens([...components]);
  };

  const addToken = (token: FormComponent) => {
    // if(!components.some(c => c.address === token.address)) {
    setTokens([...components, token]);
    // }
  };

  const setError = (amountError: boolean, index: number) => {
    const comp = components[index];
    components[index] = { ...comp, amountError };
    setTokens([...components]);
  };
  const addAmount = (amount: number, index: number) => {
    const comp = components[index];
    components[index] = { ...comp, amount, amountError: false };
    setTokens([...components]);
  };

  return (
    <>
      <CreateConstellationContext.Provider
        value={{
          components,
          openComponentForm,
          setOpenComponentForm,
          setTokens,
          addToken,
          removeToken,
          addAmount,
          setError,
        }}
      >
        {children}
      </CreateConstellationContext.Provider>
    </>
  );
};

export default CreateConstellationContextProvider;
