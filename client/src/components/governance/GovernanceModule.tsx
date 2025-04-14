import { useState } from 'react';
import ReferendaList from './ReferendaList';
import { useGovernance } from '@/hooks/useGovernance';
import { useWallet } from '@/hooks/useWallet';

const GovernanceModule = () => {
  const { isConnected } = useWallet();
  const { 
    referenda, 
    loading, 
    vote,
    loadingVote
  } = useGovernance();
  
  const [filter, setFilter] = useState<'active' | 'closed' | 'all'>('active');
  
  // Filter referenda based on status
  const filteredReferenda = referenda.filter(referendum => {
    if (filter === 'all') return true;
    return filter === 'active' ? referendum.status === 'active' : referendum.status === 'closed';
  });
  
  return (
    <div className="py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <span className="material-icons text-polkadot-pink mr-2" style={{ color: "#E6007A" }}>how_to_vote</span>
              Referenda
            </h3>
            
            <div className="flex items-center space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'active' 
                    ? 'bg-polkadot-pink text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                style={{ backgroundColor: filter === 'active' ? "#E6007A" : undefined }}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'closed' 
                    ? 'bg-polkadot-pink text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                style={{ backgroundColor: filter === 'closed' ? "#E6007A" : undefined }}
                onClick={() => setFilter('closed')}
              >
                Closed
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'all' 
                    ? 'bg-polkadot-pink text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                style={{ backgroundColor: filter === 'all' ? "#E6007A" : undefined }}
                onClick={() => setFilter('all')}
              >
                All
              </button>
            </div>
          </div>
          
          <ReferendaList 
            referenda={filteredReferenda}
            isWalletConnected={isConnected}
            loading={loading}
            onVote={vote}
            loadingVote={loadingVote}
          />
        </div>
      </div>
    </div>
  );
};

export default GovernanceModule;
