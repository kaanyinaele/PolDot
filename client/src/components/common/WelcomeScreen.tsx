import PolkadotIcon from "./PolkadotIcon";
import { useWallet } from "@/hooks/useWallet";

interface WelcomeScreenProps {
  onClose: () => void;
  syncProgress: number;
  lightClientSetupComplete: boolean;
}

const WelcomeScreen = ({ 
  onClose, 
  syncProgress, 
  lightClientSetupComplete 
}: WelcomeScreenProps) => {
  const { connectWallet } = useWallet();
  
  const handleGetStarted = () => {
    onClose();
    connectWallet();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 md:p-8">
        <div className="text-center mb-6">
          <PolkadotIcon className="h-16 w-auto mx-auto" />
          <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">Welcome to DotFlow</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">A lightweight, fully client-side Polkadot staking & governance hub</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold flex items-center text-gray-900 dark:text-white">
              <span className="material-icons mr-2 text-polkadot-pink" style={{ color: "#E6007A" }}>sync</span>
              Setting Up Light Client
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              DotFlow is syncing with the Polkadot network. This allows you to interact directly with the blockchain without relying on centralized servers.
            </p>
            <div className="mt-3">
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-polkadot-pink rounded-full" 
                  style={{ width: `${syncProgress}%`, backgroundColor: "#E6007A" }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                <span>{lightClientSetupComplete ? "Sync complete" : "Syncing blocks..."}</span>
                <span>{syncProgress}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">What you can do with DotFlow:</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="material-icons text-polkadot-teal mr-2 text-base" style={{ color: "#42E8E0" }}>how_to_vote</span>
                <span>Participate in governance by voting on referenda</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-polkadot-teal mr-2 text-base" style={{ color: "#42E8E0" }}>savings</span>
                <span>Stake your DOT tokens and nominate validators</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-polkadot-teal mr-2 text-base" style={{ color: "#42E8E0" }}>attach_money</span>
                <span>Claim staking rewards and manage nominations</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-polkadot-teal mr-2 text-base" style={{ color: "#42E8E0" }}>privacy_tip</span>
                <span>All actions run directly in your browser - no backend servers</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button 
              className="bg-polkadot-pink hover:bg-opacity-90 text-white rounded-lg px-6 py-2 font-medium transition-colors flex items-center"
              style={{ backgroundColor: "#E6007A" }}
              onClick={handleGetStarted}
              disabled={syncProgress < 100}
            >
              <span className="material-icons mr-2">rocket_launch</span>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
