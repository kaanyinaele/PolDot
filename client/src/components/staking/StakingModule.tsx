import { useState } from 'react';
import StakingSummary from './StakingSummary';
import NominationsList from './NominationsList';
import ValidatorsList from './ValidatorsList';
import { useStaking } from '@/hooks/useStaking';
import { useWallet } from '@/hooks/useWallet';

const StakingModule = () => {
  const { isConnected } = useWallet();
  const { 
    stakingInfo, 
    validators, 
    loading, 
    stakeMore, 
    unstake,
    claimRewards,
    nominate
  } = useStaking();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter validators based on search term
  const filteredValidators = validators.filter(validator => 
    validator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    validator.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="py-6 md:flex md:space-x-6">
      <div className="md:w-1/3">
        <StakingSummary 
          isWalletConnected={isConnected}
          stakingInfo={stakingInfo}
          onStakeMore={stakeMore}
          onUnstake={unstake}
          onClaimRewards={claimRewards}
          loading={loading}
        />
        
        <div className="mt-6">
          <NominationsList 
            isWalletConnected={isConnected}
            nominations={stakingInfo?.nominations || []}
            onChangeNominations={() => {}} // This will be implemented in a modal
          />
        </div>
      </div>
      
      <div className="mt-6 md:mt-0 md:w-2/3">
        <ValidatorsList 
          validators={filteredValidators}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNominate={nominate}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default StakingModule;
