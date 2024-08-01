
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Wallet } from '../../types';
import { Connector } from '@soroban-react/types';
import { SorobanContextType } from '@soroban-react/core';
import { RootState } from '../store';

interface Wal{
  id: string;
  name: string;
  isDetected: boolean
}
 export interface WalletState {
    wallets: Array<Wal>
    address: string;
 }
 

const initialState: WalletState = {
    wallets: [],
    address: ''
} 

export const getWallets = createAsyncThunk(
    "wallets/balance",
    async (context: SorobanContextType, _) => {  
     const wallets: Array<Wal> = []
      const { connectors } = context
     for(let wallet of connectors) {
        const isDetected = await wallet.isConnected();

        wallets.push({name:wallet.name, isDetected, id: wallet.id})

     //   const address = await wallet.getPublicKey();
       // console.log('-->> -->>  address ', address)
     }

     console.log('-->> -->>  address ', context.address)
    
       return wallets
    },
);
 
export const walletsSlice = createSlice({
  name: 'wallets', 
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => { 
      state.address =action.payload
    },
  },
  extraReducers:(builder) => {
      builder.addCase(getWallets.fulfilled, (state ,action) => { 
        state.wallets = action.payload;
      })
     
  }
})

export const { setAddress } = walletsSlice.actions
export const address = (state: RootState) => state.wallet.address;
export default walletsSlice.reducer
