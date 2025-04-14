import { useState } from 'react';
import { Referendum, VoteValue } from '@/types';
import { useWallet } from '@/hooks/useWallet';

interface ReferendaListProps {
  referenda: Referendum[];
  isWalletConnected: boolean;
  loading: boolean;
  onVote: (referendumId: number, value: VoteValue) => void;
  loadingVote: Record<number, boolean>;
}

const ReferendaList = ({ 
  referenda, 
  isWalletConnected,
  loading,
  onVote,
  loadingVote
}: ReferendaListProps) => {
  const { connectWallet } = useWallet();
  const [expandedReferendumId, setExpandedReferendumId] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    if (expandedReferendumId === id) {
      setExpandedReferendumId(null);
    } else {
      setExpandedReferendumId(id);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-polkadot-pink" style={{ borderColor: "#E6007A" }}></div>
      </div>
    );
  }
  
  if (referenda.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <span className="material-icons text-4xl text-gray-400">ballot</span>
        <p className="mt-2 text-gray-500">No referenda found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {referenda.map((referendum) => {
        const isExpanded = expandedReferendumId === referendum.id;
        
        return (
          <div 
            key={referendum.id} 
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={() => toggleExpand(referendum.id)}
          >
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    referendum.status === 'active' ? 'bg-status-success' : 'bg-status-error'
                  } mr-2`} 
                  style={{ 
                    backgroundColor: referendum.status === 'active' ? '#4CAF50' : '#F44336' 
                  }}
                  />
                  Referendum #{referendum.id}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{referendum.title}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  referendum.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {referendum.status === 'active' ? 'Active' : 'Closed'}
                </span>
                {referendum.status === 'active' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Ends in: {referendum.endsIn}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-polkadot-pink" 
                  style={{ 
                    width: `${referendum.ayePercentage}%`, 
                    backgroundColor: "#E6007A"
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Aye: {referendum.ayePercentage}%</span>
                <span>Nay: {referendum.nayPercentage}%</span>
              </div>
            </div>
            
            {/* Expanded description */}
            {isExpanded && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-lg transition-all">
                <h5 className="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                  <span className="material-icons text-sm mr-1">description</span>
                  Description
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {referendum.description}
                </p>
                
                <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="material-icons text-xs mr-1">link</span>
                  <a 
                    href={referendum.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-polkadot-pink hover:underline"
                    style={{ color: "#E6007A" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View on Polkassembly
                  </a>
                </div>
              </div>
            )}
            
            {/* Voting actions */}
            {referendum.status === 'active' && (
              <div 
                className="mt-4 flex justify-end space-x-2"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on buttons
              >
                {!isWalletConnected ? (
                  <button 
                    className="bg-polkadot-pink text-white rounded-lg px-4 py-1 text-sm font-medium hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: "#E6007A" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      connectWallet();
                    }}
                  >
                    Connect to Vote
                  </button>
                ) : (
                  <>
                    <button 
                      className="bg-status-success text-white rounded-lg px-4 py-1 text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      style={{ backgroundColor: "#4CAF50" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onVote(referendum.id, 'aye');
                      }}
                      disabled={loadingVote[referendum.id]}
                    >
                      {loadingVote[referendum.id] ? 'Voting...' : 'Vote Aye'}
                    </button>
                    <button 
                      className="bg-status-error text-white rounded-lg px-4 py-1 text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      style={{ backgroundColor: "#F44336" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onVote(referendum.id, 'nay');
                      }}
                      disabled={loadingVote[referendum.id]}
                    >
                      {loadingVote[referendum.id] ? 'Voting...' : 'Vote Nay'}
                    </button>
                  </>
                )}
              </div>
            )}
            
            {/* Expand/collapse indicator */}
            <div className="mt-2 flex justify-center">
              <span 
                className="material-icons text-gray-400 dark:text-gray-500 transition-transform duration-200"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReferendaList;
