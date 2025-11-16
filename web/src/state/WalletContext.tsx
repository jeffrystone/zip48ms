import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback
} from "react";

interface WalletState {
  address?: string;
  setAddress: (address?: string) => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>();

  const value = useMemo(() => ({ address, setAddress }), [address]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return ctx;
};

