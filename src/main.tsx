import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import MySorobanReactProvider from "./soroban/SorobanReactProvider.tsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <MySorobanReactProvider>
        <App />
      </MySorobanReactProvider>
    </BrowserRouter> 
);
