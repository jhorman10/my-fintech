import React, { memo, useCallback } from 'react';

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = memo(({ onActionClick }) => {
  const quickActions = [
    { id: 'transfer', label: 'Transfer Money', icon: '💸', color: 'blue' },
    { id: 'pay-bill', label: 'Pay Bills', icon: '📄', color: 'green' },
    { id: 'deposit', label: 'Mobile Deposit', icon: '📱', color: 'purple' },
    { id: 'budget', label: 'Budget Tracker', icon: '📊', color: 'orange' },
  ];

  const handleActionClick = useCallback((actionId: string) => {
    onActionClick?.(actionId);
  }, [onActionClick]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30';
      case 'green':
        return 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30';
      case 'purple':
        return 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30';
      case 'orange':
        return 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-900/30';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600';
    }
  };

  return (
    <div className="quick-actions bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-colors ${getColorClasses(action.color)}`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-medium">{action.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="w-full text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          More Actions
        </button>
      </div>
    </div>
  );
});

QuickActions.displayName = 'QuickActions';

export default QuickActions;
