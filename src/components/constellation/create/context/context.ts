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
    addToken: (_token: FormComponent) => {}, // Default no-op function for setCompItem
    removeToken:(_index: number)=>{},
    addAmount: (_amount: number, _: number) => {},
    setError: ( _error: boolean, _: number) => {}
});

export default CreateConstellationContext

