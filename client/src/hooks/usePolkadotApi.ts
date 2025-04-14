import { useState, useEffect } from 'react';
import { ApiPromise } from '@polkadot/api';
import { initializeApi } from '@/lib/polkadot';
import { useToast } from '@/hooks/use-toast';

export function usePolkadotApi() {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [syncState, setSyncState] = useState<'disconnected' | 'connecting' | 'connected' | 'syncing'>('connecting');
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initialize = async () => {
      try {
        setSyncState('connecting');
        setLoading(true);
        
        const { api: newApi, unsubscribe: newUnsubscribe } = await initializeApi();
        setApi(newApi);
        unsubscribe = newUnsubscribe;
        
        // Subscribe to new blocks
        const subscribeBlock = await newApi.rpc.chain.subscribeNewHeads((header) => {
          setBlockHeight(header.number.toNumber());
          setSyncState('connected');
        });
        
        setLoading(false);
        
        toast({
          title: "Connected to Polkadot",
          description: "Successfully connected to the network via light client.",
        });
        
      } catch (err: any) {
        console.error("Failed to connect to Polkadot:", err);
        setError(err);
        setLoading(false);
        setSyncState('disconnected');
        
        toast({
          title: "Connection Error",
          description: err.message || "Failed to connect to Polkadot network",
          variant: "destructive",
        });
      }
    };

    initialize();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [toast]);

  return { api, loading, error, syncState, blockHeight };
}
