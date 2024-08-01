import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import MySorobanReactProvider from "./soroban/SorobanReactProvider.tsx";
import { store } from "./state/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MySorobanReactProvider>
          <App />
        </MySorobanReactProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
