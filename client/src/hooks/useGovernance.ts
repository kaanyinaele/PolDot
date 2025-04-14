import { useState, useEffect, useCallback } from 'react';
import { usePolkadotApi } from './usePolkadotApi';
import { useWallet } from './useWallet';
import { useToast } from '@/hooks/use-toast';
import { Referendum, VoteValue } from '@/types';

export function useGovernance() {
  const { api, loading: apiLoading } = usePolkadotApi();
  const { isConnected, address, signAndSend } = useWallet();
  const [referenda, setReferenda] = useState<Referendum[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVote, setLoadingVote] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  
  // Fetch referenda
  useEffect(() => {
    if (!api || apiLoading) return;
    
    const getReferenda = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch actual referenda from the chain
        // For now, we'll use mock data to represent the UI structure
        const mockReferenda: Referendum[] = [
          {
            id: 58,
            title: "Treasury Proposal: Polkadot Digest Q2 2023 Funding",
            description: "Funding for the continued operation of the Polkadot Digest...",
            status: 'active',
            ayePercentage: 67,
            nayPercentage: 33,
            endsIn: '2 days 5 hours',
            link: 'https://polkadot.polkassembly.io/referendum/58'
          },
          {
            id: 57,
            title: "Update Runtime to v9370",
            description: "This upgrade includes several bug fixes and performance improvements...",
            status: 'active',
            ayePercentage: 92,
            nayPercentage: 8,
            endsIn: '1 day 10 hours',
            link: 'https://polkadot.polkassembly.io/referendum/57'
          },
          {
            id: 56,
            title: "Treasury Proposal: Polkadot JS Enhancement",
            description: "Funding for new features in Polkadot JS apps...",
            status: 'closed',
            ayePercentage: 78,
            nayPercentage: 22,
            link: 'https://polkadot.polkassembly.io/referendum/56'
          },
          {
            id: 55,
            title: "Parameter Change: Increase Max Nominators",
            description: "Increase the maximum number of nominators per validator...",
            status: 'closed',
            ayePercentage: 95,
            nayPercentage: 5,
            link: 'https://polkadot.polkassembly.io/referendum/55'
          },
        ];
        
        setReferenda(mockReferenda);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching referenda:", error);
        setLoading(false);
        toast({
          title: "Error fetching referenda",
          description: "Failed to load governance information. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    getReferenda();
  }, [api, apiLoading, toast]);
  
  // Vote on a referendum
  const vote = useCallback(async (referendumId: number, value: VoteValue) => {
    if (!api || !isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote on referenda.",
        variant: "destructive",
      });
      return;
    }
    
    setLoadingVote(prev => ({ ...prev, [referendumId]: true }));
    
    try {
      // In a real implementation, this would create the voting transaction
      // For now, just simulate the process
      toast({
        title: "Voting",
        description: `Voting ${value} on referendum #${referendumId}...`,
      });
      
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // const balance = await api.query.system.account(address);
      // const free = balance.data.free.toBigInt();
      // const amount = free / BigInt(10); // Vote with 10% of balance
      
      // Real implementation would be something like:
      // const vote = value === 'aye' ? { aye: true, conviction: 1 } : { aye: false, conviction: 1 };
      // const extrinsic = api.tx.democracy.vote(referendumId, vote);
      // await signAndSend(extrinsic);
      
      setLoadingVote(prev => ({ ...prev, [referendumId]: false }));
      
      toast({
        title: "Vote submitted",
        description: `Your ${value} vote on referendum #${referendumId} has been submitted.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Error voting:", error);
      setLoadingVote(prev => ({ ...prev, [referendumId]: false }));
      toast({
        title: "Error voting",
        description: "Failed to submit your vote. Please try again.",
        variant: "destructive",
      });
    }
  }, [api, isConnected, toast]);
  
  return {
    referenda,
    loading,
    vote,
    loadingVote
  };
}
