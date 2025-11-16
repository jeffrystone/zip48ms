import { useCallback, useState } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<any>;
    };
  }
}

export const SNAP_ID = "npm:@chainsafe/webzjs-zcash-snap";

export interface SnapTransactionResult {
  txId: string;
}

export const useZcashSnap = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);

  const connectSnap = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not available");
    }
    
    await window.ethereum.request({
      method: "wallet_requestSnaps",
      params: {
        [SNAP_ID]: {}
      }
    });

    console.log('snaps');

    const response = await window.ethereum.request({
      method: "wallet_invokeSnap",
      params: {
        snapId: SNAP_ID,
        request: {
          method: "getAddresses",
          params: { network: "testnet", account: 0 }
        }
      }
    });

    console.log('response', response);

    const list = Array.isArray(response) ? response.map(String) : [];
    setAddresses(list);
    setIsConnected(true);
    return list;
  }, []);

  const sendTransaction = useCallback(
    async (to: string, amount: number, memo?: string) => {
      if (!window.ethereum) {
        throw new Error("MetaMask is not available");
      }

      const txId = await window.ethereum.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "sendTransaction",
            params: {
              network: "testnet",
              to,
              amount,
              memo
            }
          }
        }
      });

      return txId as string;
    },
    []
  );

  return {
    isConnected,
    addresses,
    connectSnap,
    sendTransaction
  };
};

