import { useState } from "react";
import PolkadotIcon from "./PolkadotIcon";
import { useWallet } from "@/hooks/useWallet";
import { truncateAddress } from "@/lib/utils";

const Header = () => {
  const { 
    isConnected, 
    address, 
    balance, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="relative">
      {/* Decorative gradient bar */}
      <div 
        className="h-1 w-full" 
        style={{ 
          background: "linear-gradient(90deg, rgba(230,0,122,0.7) 0%, rgba(230,0,122,0.4) 50%, rgba(230,0,122,0.2) 100%)" 
        }}
      ></div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <PolkadotIcon className="h-9 w-auto" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6007A] to-[#e6007a80]">
                  DotFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Simplified Polkadot Experience</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              type="button" 
              className="md:hidden bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <span className="material-icons">menu</span>
            </button>
          </div>
          
          {/* Connect Wallet Button / Connected Wallet Info */}
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
            {isConnected ? (
              <div className="flex items-center bg-gray-100/80 dark:bg-gray-700 rounded-lg px-4 py-2 text-sm shadow-sm backdrop-blur-md">
                <span className="material-icons text-polkadot-pink mr-2" style={{ color: "#E6007A" }}>account_balance_wallet</span>
                <span className="truncate-address font-mono">{truncateAddress(address)}</span>
                <div className="mx-2 h-5 border-r border-gray-300 dark:border-gray-600"></div>
                <span className="font-semibold">{balance} DOT</span>
                <button 
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={disconnectWallet}
                >
                  <span className="material-icons text-sm">logout</span>
                </button>
              </div>
            ) : (
              <button 
                className="bg-gradient-to-r from-[#E6007A] to-[#E6007A] hover:opacity-90 text-white rounded-lg px-5 py-2 flex items-center transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30"
                onClick={connectWallet}
              >
                <span className="material-icons mr-2">account_balance_wallet</span>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
