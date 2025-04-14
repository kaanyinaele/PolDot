import { ApiPromise, WsProvider, LightProvider } from '@polkadot/api';
import '@polkadot/api-augment';

// Get the network URL from environment variables
const getRpcUrl = () => {
  // Use the actual Polkadot network websocket endpoint
  return 'wss://rpc.polkadot.io';
};

// Initialize the API with a light client if supported, otherwise fall back to WebSocket
export async function initializeApi() {
  try {
    let provider;
    
    // Use light client if available in the browser
    // For now, we'll use WebSocket as light client support is still in development
    // In a real-world implementation, we'd check for light client support
    provider = new WsProvider(getRpcUrl());
    
    const api = await ApiPromise.create({ provider });
    
    // Subscribe to connected status
    const unsubscribe = provider.on('connected', () => {
      console.log('Connected to Polkadot network');
    });
    
    provider.on('error', (error: Error) => {
      console.error('Provider error:', error);
    });
    
    provider.on('disconnected', () => {
      console.warn('Disconnected from Polkadot network');
    });
    
    // Wait for API to be ready
    await api.isReady;
    
    return { api, unsubscribe };
  } catch (error) {
    console.error('Error initializing API:', error);
    throw error;
  }
}
