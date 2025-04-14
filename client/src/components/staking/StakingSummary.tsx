import { StakingInfo } from '@/types';
import { useWallet } from '@/hooks/useWallet';

interface StakingSummaryProps {
  isWalletConnected: boolean;
  stakingInfo: StakingInfo | null;
  onStakeMore: () => void;
  onUnstake: () => void;
  onClaimRewards: () => void;
  loading: boolean;
}

const StakingSummary = ({ 
  isWalletConnected, 
  stakingInfo,
  onStakeMore,
  onUnstake,
  onClaimRewards,
  loading
}: StakingSummaryProps) => {
  const { connectWallet } = useWallet();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <span className="material-icons text-polkadot-pink mr-2" style={{ color: "#E6007A" }}>account_balance</span>
          Your Staking
        </h3>
        
        {/* Wallet not connected state */}
        {!isWalletConnected ? (
          <div className="mt-4 text-center p-4">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Connect your wallet to see your staking information</p>
            <button 
              className="bg-polkadot-pink hover:bg-opacity-90 text-white rounded-lg px-4 py-2 inline-flex items-center transition-colors"
              style={{ backgroundColor: "#E6007A" }}
              onClick={connectWallet}
            >
              <span className="material-icons mr-2">account_balance_wallet</span>
              Connect Wallet
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-32 mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-polkadot-pink" style={{ borderColor: "#E6007A" }}></div>
          </div>
        ) : (
          <>
            {/* Staked amount */}
            <div className="mt-4 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Staked Amount</span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">{stakingInfo?.stakedAmount} DOT</span>
            </div>
            
            {/* Unbonding amount */}
            <div className="mt-3 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Unbonding</span>
              <span className="text-gray-900 dark:text-white">{stakingInfo?.unbondingAmount} DOT</span>
            </div>
            
            {/* Rewards */}
            <div className="mt-3 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Available Rewards</span>
              <div className="flex items-center">
                <span className="text-gray-900 dark:text-white font-semibold">{stakingInfo?.pendingRewards} DOT</span>
                {Number(stakingInfo?.pendingRewards) > 0 && (
                  <button 
                    className="ml-2 p-1 text-xs bg-polkadot-pink text-white rounded hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: "#E6007A" }}
                    onClick={onClaimRewards}
                  >
                    Claim
                  </button>
                )}
              </div>
            </div>
            
            {/* APY */}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Current APY</span>
              <span className="text-status-success font-semibold" style={{ color: "#4CAF50" }}>{stakingInfo?.apy}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button 
                className="bg-polkadot-pink text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors hover:bg-opacity-90"
                style={{ backgroundColor: "#E6007A" }}
                onClick={onStakeMore}
              >
                Stake More
              </button>
              <button 
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={onUnstake}
              >
                Unstake
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StakingSummary;
