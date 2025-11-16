import { useState } from "react";
import { useWallet } from "../state/WalletContext";
import { useZcashSnap } from "../hooks/useZcashSnap";

const ConnectWallet = () => {
  const { addresses, setAddresses } = useWallet();
  const { connectSnap } = useZcashSnap();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string>();

  const handleConnect = async () => {
    setConnecting(true);
    setError(undefined);
    try {
      const list = await connectSnap();
      setAddresses(list);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setAddresses([]);
    setError(undefined);
  };

  return (
    <section className="panel">
      <h2>Connect Wallet</h2>
      <p>Install and connect the ChainSafe Zcash Snap through MetaMask.</p>

      <div className="button-row">
        <button onClick={handleConnect} disabled={connecting}>
          {connecting ? "Connecting..." : "Connect Zcash Snap"}
        </button>
        {addresses.length > 0 && (
          <button className="secondary" onClick={disconnect}>
            Disconnect
          </button>
        )}
      </div>

      {error && (
        <div className="address-box" style={{ marginTop: "1rem", color: "#dc2626" }}>
          {error}
        </div>
      )}

      <div className="field" style={{ marginTop: "1.5rem" }}>
        <label>Connected addresses</label>
        <div className="address-box">
          {addresses.length > 0 ? addresses.join("\n") : "Not connected"}
        </div>
      </div>
    </section>
  );
};

export default ConnectWallet;

