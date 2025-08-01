import React, { memo, useCallback, useMemo } from 'react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'pago' | 'desembolso';
  creditType: string;
  status: 'completado' | 'pendiente' | 'fallido';
}

interface RecentTransactionsProps {
  maxItems?: number;
  onTransactionClick?: (transactionId: string) => void;
  onRefresh?: () => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = memo(({ 
  maxItems = 10, 
  onTransactionClick,
  onRefresh 
}) => {
  // Mock transaction data específico para fintech según requisitos
  const transactions = useMemo<Transaction[]>(() => [
    {
      id: '1',
      description: 'Pago cuota préstamo hipotecario',
      amount: -1250000,
      date: '2024-01-15',
      type: 'pago',
      creditType: 'Préstamo Hipotecario',
      status: 'completado'
    },
    {
      id: '2',
      description: 'Desembolso tarjeta de crédito',
      amount: 500000,
      date: '2024-01-14',
      type: 'desembolso',
      creditType: 'Tarjeta de Crédito',
      status: 'completado'
    },
    {
      id: '3',
      description: 'Pago cuota préstamo de coche',
      amount: -480000,
      date: '2024-01-12',
      type: 'pago',
      creditType: 'Préstamo de Coche',
      status: 'completado'
    },
    {
      id: '4',
      description: 'Pago mínimo tarjeta de crédito',
      amount: -150000,
      date: '2024-01-10',
      type: 'pago',
      creditType: 'Tarjeta de Crédito',
      status: 'completado'
    },
    {
      id: '5',
      description: 'Desembolso préstamo personal',
      amount: 2000000,
      date: '2024-01-08',
      type: 'desembolso',
      creditType: 'Préstamo Personal',
      status: 'pendiente'
    },
    {
      id: '6',
      description: 'Pago adicional préstamo hipotecario',
      amount: -500000,
      date: '2024-01-05',
      type: 'pago',
      creditType: 'Préstamo Hipotecario',
      status: 'completado'
    }
  ], []);

  const handleTransactionClick = useCallback((transactionId: string) => {
    onTransactionClick?.(transactionId);
  }, [onTransactionClick]);

  const handleRefreshClick = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const getTransactionIcon = useCallback((type: Transaction['type']) => {
    return type === 'pago' ? '💰' : '📤';
  }, []);

  const getStatusColor = useCallback((status: Transaction['status']) => {
    switch (status) {
      case 'completado':
        return 'text-green-600 dark:text-green-400';
      case 'pendiente':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'fallido':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }, []);

  return (
    <section className="recent-transactions bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transacciones Recientes
        </h2>
        <button
          onClick={handleRefreshClick}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm sm:text-base self-start sm:self-auto"
          aria-label="Actualizar transacciones"
        >
          🔄 Actualizar
        </button>
      </header>
      
      <div className="space-y-3 overflow-x-hidden">
        {transactions.slice(0, maxItems).map((transaction) => (
          <article
            key={transaction.id}
            onClick={() => handleTransactionClick(transaction.id)}
            className="transaction-item flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 space-y-2 sm:space-y-0"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTransactionClick(transaction.id);
              }
            }}
          >
            <div className="transaction-details flex items-center space-x-3 min-w-0 flex-1">
              <div className="transaction-icon text-xl sm:text-2xl flex-shrink-0">
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {transaction.description}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="truncate max-w-[120px] sm:max-w-none">{transaction.creditType}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">{formatDate(transaction.date)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className={`capitalize whitespace-nowrap ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="transaction-amount text-left sm:text-right flex-shrink-0">
              <p className={`font-semibold text-sm sm:text-base ${
                transaction.amount > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {transaction.type}
              </p>
            </div>
          </article>
        ))}
      </div>
      
      <footer className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm sm:text-base">
          Ver todas las transacciones de crédito
        </button>
      </footer>
    </section>
  );
});

RecentTransactions.displayName = 'RecentTransactions';

export default RecentTransactions;
