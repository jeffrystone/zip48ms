import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import App from "./App";
import { WalletProvider } from "./state/WalletContext";
import "./styles.css";

(window as unknown as { Buffer?: typeof Buffer }).Buffer =
  (window as unknown as { Buffer?: typeof Buffer }).Buffer ?? Buffer;

const Main = () => {
  useEffect(() => {
    document.title = "Zcash Multisig Demo";
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<Main />);

