import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import StakingModule from "@/components/staking/StakingModule";
import GovernanceModule from "@/components/governance/GovernanceModule";

const Home = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<'staking' | 'governance'>('staking');
  
  // Handle tab navigation
  const navigateToTab = (tab: 'staking' | 'governance') => {
    window.history.pushState({}, "", `/?tab=${tab}`);
    setActiveTab(tab);
    // Manually dispatch a popstate event to trigger URL changes to be detected
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  // Parse tab from URL
  useEffect(() => {
    // Check if location includes the query parameter
    if (location.includes('?')) {
      const params = new URLSearchParams(location.split('?')[1]);
      const tab = params.get('tab');
      if (tab === 'governance') {
        setActiveTab('governance');
      } else {
        setActiveTab('staking');
      }
    }
  }, [location]);
  
  return (
    <>
      {/* Tabs Navigation */}
      <div className="mt-4 md:mt-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <div 
            onClick={() => navigateToTab('staking')}
            className={`${
              activeTab === 'staking' 
                ? 'border-polkadot-pink text-polkadot-pink' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-1 border-b-2 font-medium text-sm dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer`}
            style={{ 
              borderColor: activeTab === 'staking' ? '#E6007A' : 'transparent', 
              color: activeTab === 'staking' ? '#E6007A' : undefined 
            }}
          >
            <span className="flex items-center">
              <span className="material-icons mr-1 text-base">savings</span>
              Staking
            </span>
          </div>
          <div 
            onClick={() => navigateToTab('governance')}
            className={`${
              activeTab === 'governance' 
                ? 'border-polkadot-pink text-polkadot-pink' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-1 border-b-2 font-medium text-sm dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer`}
            style={{ 
              borderColor: activeTab === 'governance' ? '#E6007A' : 'transparent', 
              color: activeTab === 'governance' ? '#E6007A' : undefined 
            }}
          >
            <span className="flex items-center">
              <span className="material-icons mr-1 text-base">how_to_vote</span>
              Governance
            </span>
          </div>
        </nav>
      </div>
      
      {/* Content */}
      <div className="mt-6">
        {activeTab === 'staking' ? (
          <StakingModule />
        ) : (
          <GovernanceModule />
        )}
      </div>
    </>
  );
};

export default Home;
