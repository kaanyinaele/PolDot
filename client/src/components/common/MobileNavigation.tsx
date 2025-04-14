import { Link, useLocation } from "wouter";

interface MobileNavigationProps {
  activeTab?: string;
}

const MobileNavigation = ({ activeTab = "staking" }: MobileNavigationProps) => {
  const [location] = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-up border-t border-gray-200 dark:border-gray-700 z-10">
      <div className="grid grid-cols-2 h-16">
        <Link href="/?tab=staking">
          <a className={`flex items-center justify-center flex-col ${location.includes('tab=staking') || !location.includes('tab=') ? 'text-polkadot-pink border-t-2 border-polkadot-pink' : 'text-gray-500 dark:text-gray-400'}`}
             style={{ color: location.includes('tab=staking') || !location.includes('tab=') ? "#E6007A" : undefined, 
                      borderColor: location.includes('tab=staking') || !location.includes('tab=') ? "#E6007A" : undefined }}>
            <span className="material-icons text-base">savings</span>
            <span className="text-xs mt-1">Staking</span>
          </a>
        </Link>
        <Link href="/?tab=governance">
          <a className={`flex items-center justify-center flex-col ${location.includes('tab=governance') ? 'text-polkadot-pink border-t-2 border-polkadot-pink' : 'text-gray-500 dark:text-gray-400'}`}
             style={{ color: location.includes('tab=governance') ? "#E6007A" : undefined,
                      borderColor: location.includes('tab=governance') ? "#E6007A" : undefined }}>
            <span className="material-icons text-base">how_to_vote</span>
            <span className="text-xs mt-1">Governance</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
