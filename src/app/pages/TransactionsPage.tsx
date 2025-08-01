import React, { memo, useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { SectionSuspenseFallback } from '../components/LazyLoading';

// Lazy load transaction components
const TransactionModal = lazy(() => import('../components/transactions/TransactionModal'));

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'pago' | 'desembolso';
  creditType: string;
  status: 'completado' | 'pendiente' | 'fallido';
  reference: string;
  creditId: string;
}

const TransactionsPage: React.FC = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pago' | 'desembolso'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data completo de transacciones
  const allTransactions = useMemo<Transaction[]>(() => [
    {
      id: '1',
      description: 'Pago cuota préstamo hipotecario',
      amount: -1250000,
      date: '2024-01-15T10:30:00',
      type: 'pago',
      creditType: 'Préstamo Hipotecario',
      status: 'completado',
      reference: 'REF001234567',
      creditId: 'CRED-HIP-001'
    },
    {
      id: '2',
      description: 'Desembolso tarjeta de crédito',
      amount: 500000,
      date: '2024-01-14T15:45:00',
      type: 'desembolso',
      creditType: 'Tarjeta de Crédito',
      status: 'completado',
      reference: 'REF001234568',
      creditId: 'CRED-TC-002'
    },
    {
      id: '3',
      description: 'Pago cuota préstamo de coche',
      amount: -480000,
      date: '2024-01-12T09:15:00',
      type: 'pago',
      creditType: 'Préstamo de Coche',
      status: 'completado',
      reference: 'REF001234569',
      creditId: 'CRED-AUTO-003'
    },
    {
      id: '4',
      description: 'Pago mínimo tarjeta de crédito',
      amount: -150000,
      date: '2024-01-10T14:20:00',
      type: 'pago',
      creditType: 'Tarjeta de Crédito',
      status: 'completado',
      reference: 'REF001234570',
      creditId: 'CRED-TC-002'
    },
    {
      id: '5',
      description: 'Desembolso préstamo personal',
      amount: 2000000,
      date: '2024-01-08T11:00:00',
      type: 'desembolso',
      creditType: 'Préstamo Personal',
      status: 'pendiente',
      reference: 'REF001234571',
      creditId: 'CRED-PERS-004'
    }
  ], []);

  // Filtered transactions based on search and filter
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.creditType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [allTransactions, searchTerm, filterType]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value as 'all' | 'pago' | 'desembolso');
  }, []);

  const handleTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  }, []);

  const formatDateTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const getStatusColor = useCallback((status: Transaction['status']) => {
    switch (status) {
      case 'completado':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'fallido':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }, []);

  const getTypeIcon = useCallback((type: Transaction['type']) => {
    return type === 'pago' ? '💰' : '📤';
  }, []);

  return (
    <main className="transactions-page">
      <div className="transactions-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transacciones de Crédito
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Historial completo de pagos y desembolsos de tus productos crediticios
          </p>
        </header>

        {/* Filters and Search */}
        <section className="filters-section bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar transacciones
              </label>
              <input
                id="search"
                type="text"
                placeholder="Buscar por descripción, tipo de crédito o referencia..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:w-48">
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrar por tipo
              </label>
              <select
                id="filter"
                value={filterType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos</option>
                <option value="pago">Pagos</option>
                <option value="desembolso">Desembolsos</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {filteredTransactions.length} de {allTransactions.length} transacciones
          </p>
        </div>

        {/* Transactions Table */}
        <section className="transactions-table bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Transacción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo de Crédito
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTransactionClick(transaction);
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.reference}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.creditType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        transaction.amount > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No se encontraron transacciones que coincidan con los criterios de búsqueda.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Transaction Detail Modal */}
      {isModalOpen && selectedTransaction && (
        <Suspense fallback={<SectionSuspenseFallback />}>
          <TransactionModal
            transaction={selectedTransaction}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </main>
  );
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
