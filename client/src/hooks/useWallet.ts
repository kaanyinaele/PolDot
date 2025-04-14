import { useState, useEffect, useCallback } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useToast } from '@/hooks/use-toast';
import { usePolkadotApi } from './usePolkadotApi';

export function useWallet() {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const { api } = usePolkadotApi();
  const { toast } = useToast();
  
  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      // Enable the extension
      const extensions = await web3Enable('DotFlow');
      
      if (extensions.length === 0) {
        toast({
          title: "No wallet found",
          description: "Please install the Polkadot{.js} extension and try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Get all accounts
      const allAccounts = await web3Accounts();
      
      if (allAccounts.length === 0) {
        toast({
          title: "No accounts found",
          description: "Please create or import an account in your Polkadot{.js} extension.",
          variant: "destructive",
        });
        return;
      }
      
      setAccounts(allAccounts);
      setSelectedAccount(allAccounts[0]);
      setIsConnected(true);
      
      localStorage.setItem('dotflow-selected-address', allAccounts[0].address);
      
      toast({
        title: "Wallet connected",
        description: `Connected with account ${allAccounts[0].meta.name || allAccounts[0].address.substring(0, 6)}...`,
      });
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setSelectedAccount(null);
    setIsConnected(false);
    localStorage.removeItem('dotflow-selected-address');
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    });
  }, [toast]);
  
  // Check for previously connected account on load
  useEffect(() => {
    const checkPreviousConnection = async () => {
      const savedAddress = localStorage.getItem('dotflow-selected-address');
      if (savedAddress) {
        try {
          const extensions = await web3Enable('DotFlow');
          if (extensions.length > 0) {
            const allAccounts = await web3Accounts();
            const savedAccount = allAccounts.find(acc => acc.address === savedAddress);
            
            if (savedAccount) {
              setAccounts(allAccounts);
              setSelectedAccount(savedAccount);
              setIsConnected(true);
            }
          }
        } catch (error) {
          console.error("Error checking previous connection:", error);
        }
      }
    };
    
    checkPreviousConnection();
  }, []);
  
  // Get balance when account changes
  useEffect(() => {
    if (api && selectedAccount) {
      let unsubscribe: (() => void) | undefined;
      
      const getBalance = async () => {
        try {
          unsubscribe = await api.query.system.account(selectedAccount.address, (accountInfo: any) => {
            const free = accountInfo.data.free.toString();
            // Format to DOT with 4 decimals (1 DOT = 10^10 units)
            const formattedBalance = (parseFloat(free) / 10000000000).toFixed(2);
            setBalance(formattedBalance);
          });
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      
      getBalance();
      
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [api, selectedAccount]);
  
  // Sign a transaction
  const signAndSend = useCallback(async (extrinsic: any) => {
    if (!api || !selectedAccount) {
      throw new Error("API or account not available");
    }
    
    try {
      // Get the injected account
      const injector = await web3FromSource(selectedAccount.meta.source);
      
      // Sign and send the transaction
      return new Promise<string>((resolve, reject) => {
        extrinsic
          .signAndSend(
            selectedAccount.address,
            { signer: injector.signer },
            ({ status, events, dispatchError }: any) => {
              if (status.isInBlock || status.isFinalized) {
                if (dispatchError) {
                  if (dispatchError.isModule) {
                    // For module errors, we have the section and method
                    const decoded = api.registry.findMetaError(dispatchError.asModule);
                    const { section, method } = decoded;
                    reject(new Error(`${section}.${method}`));
                  } else {
                    // Other errors
                    reject(new Error(dispatchError.toString()));
                  }
                } else {
                  // Success
                  resolve(status.asInBlock.toString());
                }
              }
            }
          )
          .catch((error: any) => {
            reject(error);
          });
      });
      
    } catch (error) {
      console.error("Error signing transaction:", error);
      throw error;
    }
  }, [api, selectedAccount]);
  
  return {
    isConnected,
    address: selectedAccount?.address || '',
    accounts,
    selectedAccount,
    balance,
    connectWallet,
    disconnectWallet,
    signAndSend
  };
}
