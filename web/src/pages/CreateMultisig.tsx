import { useMemo, useState } from "react";
import { useWallet } from "../state/WalletContext";
import { generateP2shMultisigAddress } from "../lib/p2sh";

const placeholderKeys = [
  "03b28f1d5c3c1a97f4723a865bb6c8e8d4b3ffb0add0733a2f684d215c2f1c84a1",
  "029bb0a4198a7d5b5d820b08a3f5c507d7c6fc0e0e78778c550348ade6a087d8ec",
  "024f4ff15f3e238adb6c8ed81c7e61d3419ce8765d1de472cf6c7af205c3bd0db1"
];

const CreateMultisig = () => {
  const { address } = useWallet();
  const initialKeys = useMemo(() => {
    const base = address ? [address, ...placeholderKeys] : placeholderKeys;
    return base.join("\n");
  }, [address]);

  const [keysInput, setKeysInput] = useState(initialKeys);
  const [threshold, setThreshold] = useState(2);

  const participants = keysInput
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const result = generateP2shMultisigAddress(participants, threshold);

  return (
    <section className="panel">
      <h2>Create Multisig Address</h2>
      <p>Enter public keys (one per line). The first owner defaults to the connected wallet.</p>

      <div className="field">
        <label>Public keys</label>
        <textarea value={keysInput} onChange={(event) => setKeysInput(event.target.value)} />
      </div>

      <div className="field">
        <label>Threshold (m of n)</label>
        <input
          type="number"
          min={1}
          max={participants.length || 1}
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
      </div>

      <div className="field">
        <label>Generated address</label>
        <div className="address-box">{result?.address ?? "Not enough data"}</div>
      </div>

      <div className="field">
        <label>Redeem Script</label>
        <div className="address-box">{result?.redeemScript ?? "—"}</div>
      </div>
    </section>
  );
};

export default CreateMultisig;

