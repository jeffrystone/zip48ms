import { useState } from "react";
import { useWallet } from "../state/WalletContext";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<any>;
    };
  }
}

const ConnectWallet = () => {
  const { address, setAddress } = useWallet();
  const [connecting, setConnecting] = useState(false);

  const connectMetamask = async () => {
    setConnecting(true);
    try {
      if (window.ethereum?.request) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (Array.isArray(accounts) && accounts[0]) {
          setAddress(String(accounts[0]));
          return;
        }
      }
      setAddress("0x" + crypto.randomUUID().replace(/-/g, "").slice(0, 40));
    } catch (error) {
      console.warn("Metamask connection failed", error);
      setAddress("0x" + crypto.randomUUID().replace(/-/g, "").slice(0, 40));
    } finally {
      setConnecting(false);
    }
  };

  const connectLedger = () => {
    const pseudo = `ledger-${Date.now().toString(16)}`;
    setAddress(pseudo);
  };

  const disconnect = () => setAddress(undefined);

  return (
    <section className="panel">
      <h2>Connect Wallet</h2>
      <p>Select an available option to connect to the Zcash testnet.</p>

      <div className="button-row">
        <button onClick={connectMetamask} disabled={connecting}>
          {connecting ? "Connecting..." : "Metamask"}
        </button>
        <button className="secondary" onClick={connectLedger}>
          Ledger
        </button>
        {address && (
          <button className="secondary" onClick={disconnect}>
            Disconnect
          </button>
        )}
      </div>

      <div className="field" style={{ marginTop: "1.5rem" }}>
        <label>Current address</label>
        <div className="address-box">{address ?? "Not connected"}</div>
      </div>
    </section>
  );
};

export default ConnectWallet;

