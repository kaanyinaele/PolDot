import { Validator } from '@/types';
import { truncateAddress } from '@/lib/utils';

interface ValidatorsListProps {
  validators: Validator[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNominate: (validator: Validator) => void;
  loading: boolean;
}

const ValidatorsList = ({ 
  validators, 
  searchTerm, 
  onSearchChange, 
  onNominate,
  loading
}: ValidatorsListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <span className="material-icons text-polkadot-pink mr-2" style={{ color: "#E6007A" }}>how_to_reg</span>
            Validators
          </h3>
          
          <div className="flex items-center">
            <div className="relative mr-2">
              <input 
                type="text" 
                placeholder="Search validators..." 
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-polkadot-pink dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <span className="material-icons absolute right-2 top-1.5 text-gray-400 text-sm">search</span>
            </div>
            
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600" title="Filter">
              <span className="material-icons text-sm">filter_list</span>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-polkadot-pink" style={{ borderColor: "#E6007A" }}></div>
          </div>
        ) : validators.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48">
            <span className="material-icons text-4xl text-gray-400">search_off</span>
            <p className="mt-2 text-gray-500">No validators found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Validator</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commission</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Own Stake</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nominators</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {validators.map((validator) => (
                    <tr key={validator.address} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
                            <span className="material-icons text-polkadot-purple text-sm" style={{ color: "#552BBF" }}>account_circle</span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{validator.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate-address">{truncateAddress(validator.address)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">{validator.commission}%</td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">{validator.ownStake} DOT</td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">{validator.nominators}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                        <button 
                          className="bg-polkadot-pink text-white rounded-lg py-1 px-3 text-xs font-medium transition-colors hover:bg-opacity-90"
                          style={{ backgroundColor: "#E6007A" }}
                          onClick={() => onNominate(validator)}
                        >
                          Nominate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Showing {validators.length} of {validators.length} validators</span>
              <div className="flex items-center space-x-2">
                <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50" disabled>
                  <span className="material-icons text-sm">chevron_left</span>
                </button>
                <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <span className="material-icons text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ValidatorsList;
