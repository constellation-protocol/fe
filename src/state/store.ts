import { configureStore } from "@reduxjs/toolkit"; 
import { walletsSlice } from "./reducer/wallet";
import  "./reducer/wallet"

export const store = configureStore({
  reducer: {
    wallet: walletsSlice.reducer
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
