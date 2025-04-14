import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import StatusBar from "@/components/light-client/StatusBar";
import Header from "@/components/common/Header";
import MobileNavigation from "@/components/common/MobileNavigation";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import NotificationCenter from "@/components/common/NotificationCenter";
import { useToast } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [lightClientSetupComplete, setLightClientSetupComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();
  
  // Simulate light client initialization
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          setLightClientSetupComplete(true);
          toast({
            title: "Light client synchronized",
            description: "Your connection to Polkadot network is active.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [toast]);
  
  const closeWelcomeScreen = () => {
    setIsFirstTimeUser(false);
    localStorage.setItem('dotflow-first-time', 'false');
  };
  
  // Check if user has been here before
  useEffect(() => {
    const firstTimeStatus = localStorage.getItem('dotflow-first-time');
    if (firstTimeStatus === 'false') {
      setIsFirstTimeUser(false);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <StatusBar 
          syncState="connected" 
          blockHeight={16244128} 
          networkName="Polkadot" 
        />
        
        <Header />
        
        {isFirstTimeUser && (
          <WelcomeScreen 
            onClose={closeWelcomeScreen}
            syncProgress={syncProgress}
            lightClientSetupComplete={lightClientSetupComplete}
          />
        )}
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-6 relative">
          {/* Decorative accent elements */}
          <div className="absolute -top-10 -left-40 w-80 h-80 bg-gradient-radial from-pink-100/20 to-transparent rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(253,242,248,0.4) 0%, rgba(253,242,248,0) 70%)" }}></div>
          <div className="absolute -bottom-20 -right-40 w-80 h-80 bg-gradient-radial from-pink-100/20 to-transparent rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(253,242,248,0.4) 0%, rgba(253,242,248,0) 70%)" }}></div>
          
          <Router />
        </main>
        
        <MobileNavigation />
        
        <NotificationCenter />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
