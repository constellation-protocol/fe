import { createContext } from 'react';
import { FormComponent } from '../../component/type';

interface CreateConstellationContextType {
    components: Array<FormComponent> ;
    openComponentForm: boolean;
    setTokens: React.Dispatch<React.SetStateAction<Array<FormComponent>>>;
    setOpenComponentForm: React.Dispatch<React.SetStateAction<boolean>>;
    addToken:(token: FormComponent)=>void
    removeToken:(index: number) => void;
    addAmount:(amount: number, index: number)=>void
    setError: ( error: boolean, index: number) => void;

}

const CreateConstellationContext = createContext<CreateConstellationContextType>({
    components: [], 
    openComponentForm: false,
    setTokens: () => {},
    setOpenComponentForm: () => {},
    addToken: (token: FormComponent) => {}, // Default no-op function for setCompItem
    removeToken:(index: number)=>{},
    addAmount: (amount: number, index: number) => {},
    setError: ( error: boolean, index: number) => {}
});

export default CreateConstellationContext

