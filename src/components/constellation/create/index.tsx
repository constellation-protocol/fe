import CreateConstellationContextProvider from "./context/provider";
import CreateToken from "./create";

const CreateTokenIndex = () => {
  return (
    <CreateConstellationContextProvider>
      <CreateToken />
    </CreateConstellationContextProvider>
  );
};

export default CreateTokenIndex;
