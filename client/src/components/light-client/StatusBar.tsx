interface StatusBarProps {
  syncState: 'disconnected' | 'connecting' | 'connected' | 'syncing';
  blockHeight: number;
  networkName: string;
}

const StatusBar = ({ syncState, blockHeight, networkName }: StatusBarProps) => {
  return (
    <div className="bg-polkadot-purple text-white px-4 py-2 flex items-center justify-between text-sm" 
         style={{ backgroundColor: "#552BBF" }}>
      <div className="flex items-center space-x-2">
        <span 
          className={`inline-block h-2 w-2 rounded-full ${
            syncState === 'connected' 
              ? 'bg-status-success animate-pulse' 
              : syncState === 'syncing' 
                ? 'bg-status-warning animate-pulse' 
                : 'bg-status-error'
          }`}
          style={{ 
            backgroundColor: syncState === 'connected' 
              ? '#4CAF50' 
              : syncState === 'syncing' 
                ? '#FF9800' 
                : '#F44336' 
          }}
        />
        <span>
          {syncState === 'connected' 
            ? `Connected to ${networkName} Network` 
            : syncState === 'syncing' 
              ? `Syncing with ${networkName}` 
              : `Disconnected from ${networkName}`}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span className="font-mono">Block: #{blockHeight.toLocaleString()}</span>
        </div>
        <div className="hidden md:block">
          <span className="font-mono">Peers: 5</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
