import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Referendum } from '@/types';

interface ReferendumModalProps {
  referendum: Referendum | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferendumModal = ({ referendum, open, onOpenChange }: ReferendumModalProps) => {
  if (!referendum) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span 
              className={`inline-block h-2 w-2 rounded-full mr-2`} 
              style={{ 
                backgroundColor: referendum.status === 'active' ? '#4CAF50' : '#F44336' 
              }}
            />
            Referendum #{referendum.id}
          </DialogTitle>
          <DialogDescription className="text-lg font-medium">
            {referendum.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-3">
          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-polkadot-pink" 
              style={{ 
                width: `${referendum.ayePercentage}%`, 
                backgroundColor: "#E6007A"
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Aye: {referendum.ayePercentage}%</span>
            <span>Nay: {referendum.nayPercentage}%</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <span className="material-icons text-polkadot-pink mr-1" style={{ color: "#E6007A", fontSize: "1.1rem" }}>info</span>
            Details
          </h3>
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm">{referendum.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Status: </span>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  referendum.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {referendum.status === 'active' ? 'Active' : 'Closed'}
                </span>
              </div>
              
              {referendum.status === 'active' && referendum.endsIn && (
                <div className="text-sm">
                  <span className="font-medium">Ends in: </span>
                  <span>{referendum.endsIn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-sm text-gray-500">
            For more details, view on 
            <a 
              href={referendum.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-polkadot-pink hover:underline ml-1"
              style={{ color: "#E6007A" }}
            >
              Polkassembly
            </a>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReferendumModal;