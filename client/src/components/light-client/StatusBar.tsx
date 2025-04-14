interface StatusBarProps {
  syncState: 'disconnected' | 'connecting' | 'connected' | 'syncing';
  blockHeight: number;
  networkName: string;
}

const StatusBar = ({ syncState, blockHeight, networkName }: StatusBarProps) => {
  // Define status colors
  const statusColors = {
    connected: '#4CAF50',
    syncing: '#FF9800',
    disconnected: '#F44336'
  };
  
  // Get current status color
  const getStatusColor = () => {
    if (syncState === 'connected') return statusColors.connected;
    if (syncState === 'syncing') return statusColors.syncing;
    return statusColors.disconnected;
  };
  
  return (
    <div className="relative backdrop-blur-sm bg-opacity-95 shadow-sm z-10" 
         style={{ 
           background: `linear-gradient(to right, rgba(230,0,122,0.9), rgba(85,43,191,0.9))`,
         }}>
      {/* Subtle dot pattern overlay for texture */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             pointerEvents: 'none'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-sm text-white">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span 
              className={`inline-block h-2.5 w-2.5 rounded-full animate-pulse mr-2`}
              style={{ 
                backgroundColor: getStatusColor(),
                boxShadow: `0 0 10px ${getStatusColor()}`
              }}
            />
            <span className="font-medium">
              {syncState === 'connected' 
                ? `Connected to ${networkName}` 
                : syncState === 'syncing' 
                  ? `Syncing with ${networkName}` 
                  : `Disconnected from ${networkName}`}
            </span>
          </div>
        </div>
        <div className="flex items-center divide-x divide-white/20">
          <div className="pr-4">
            <span className="font-mono flex items-center">
              <span className="material-icons text-sm mr-1">account_tree</span>
              #{blockHeight.toLocaleString()}
            </span>
          </div>
          <div className="hidden md:block pl-4">
            <span className="font-mono flex items-center">
              <span className="material-icons text-sm mr-1">hub</span>
              5 peers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
