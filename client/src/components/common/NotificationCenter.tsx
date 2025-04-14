import { useState, useEffect } from 'react';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  // Demo notification - will be replaced with real notifications from hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: "New Referendum #58",
        message: "A new referendum is now open for voting",
        type: "info",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const addNotification = ({ title, message, type }: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      title,
      message,
      type,
      timestamp: Date.now(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-72">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 overflow-hidden transform transition-all duration-300 ease-in-out ${
            notification.type === 'info' 
              ? 'border-status-info' 
              : notification.type === 'success' 
                ? 'border-status-success' 
                : notification.type === 'warning'
                  ? 'border-status-warning'
                  : 'border-status-error'
          }`}
          style={{ 
            borderLeftColor: 
              notification.type === 'info' 
                ? '#2196F3' 
                : notification.type === 'success' 
                  ? '#4CAF50' 
                  : notification.type === 'warning'
                    ? '#FF9800'
                    : '#F44336'
          }}
        >
          <div className="px-4 py-3">
            <div className="flex items-start">
              <div className="shrink-0">
                <span 
                  className={`material-icons ${
                    notification.type === 'info' 
                      ? 'text-status-info' 
                      : notification.type === 'success' 
                        ? 'text-status-success' 
                        : notification.type === 'warning'
                          ? 'text-status-warning'
                          : 'text-status-error'
                  }`}
                  style={{ 
                    color: 
                      notification.type === 'info' 
                        ? '#2196F3' 
                        : notification.type === 'success' 
                          ? '#4CAF50' 
                          : notification.type === 'warning'
                            ? '#FF9800'
                            : '#F44336'
                  }}
                >
                  {notification.type === 'info' 
                    ? 'info' 
                    : notification.type === 'success' 
                      ? 'check_circle' 
                      : notification.type === 'warning'
                        ? 'warning'
                        : 'error'}
                </span>
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
              </div>
              <div className="ml-4 shrink-0 flex">
                <button 
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => removeNotification(notification.id)}
                >
                  <span className="material-icons text-sm">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
