import { Validator } from '@/types';
import { truncateAddress } from '@/lib/utils';
import { useWallet } from '@/hooks/useWallet';

interface NominationsListProps {
  isWalletConnected: boolean;
  nominations: Validator[];
  onChangeNominations: () => void;
}

const NominationsList = ({ 
  isWalletConnected, 
  nominations, 
  onChangeNominations 
}: NominationsListProps) => {
  const { connectWallet } = useWallet();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="material-icons text-polkadot-purple mr-2" style={{ color: "#552BBF" }}>people</span>
          Your Nominations
        </h3>
        
        {!isWalletConnected ? (
          <div className="text-center p-4">
            <p className="text-gray-500 dark:text-gray-400">Connect your wallet to see your nominations</p>
          </div>
        ) : nominations.length > 0 ? (
          <>
            {nominations.map((validator) => (
              <div key={validator.address} className="mb-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="material-icons text-polkadot-purple text-sm" style={{ color: "#552BBF" }}>account_circle</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">{validator.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{truncateAddress(validator.address)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">{validator.commission}% Fee</div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              className="w-full mt-2 border border-polkadot-pink text-polkadot-pink rounded-lg py-2 px-4 text-sm font-medium transition-colors hover:bg-polkadot-pink hover:bg-opacity-10"
              style={{ borderColor: "#E6007A", color: "#E6007A" }}
              onClick={onChangeNominations}
            >
              Change Nominations
            </button>
          </>
        ) : (
          <div className="text-center p-4">
            <span className="material-icons text-gray-400 text-5xl">person_add_disabled</span>
            <p className="text-gray-500 dark:text-gray-400 mt-2">You don't have any active nominations</p>
            <button 
              className="mt-4 bg-polkadot-pink text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors hover:bg-opacity-90"
              style={{ backgroundColor: "#E6007A" }}
              onClick={onChangeNominations}
            >
              Nominate Validators
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NominationsList;
