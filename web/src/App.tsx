import { Link, Route, Routes, Navigate } from "react-router-dom";
import ConnectWallet from "./pages/ConnectWallet";
import CreateMultisig from "./pages/CreateMultisig";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span>Zcash Multisig Demo</span>
        </div>
        <nav>
          <Link to="/connect">Connect</Link>
          <Link to="/multisig">Multisig</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/connect" replace />} />
          <Route path="/connect" element={<ConnectWallet />} />
          <Route path="/multisig" element={<CreateMultisig />} />
        </Routes>
      </main>
    </div>
  );
}

