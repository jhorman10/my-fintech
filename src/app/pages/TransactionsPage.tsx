import React, { useState, useEffect } from 'react';
import { useAuth } from '../core/services/auth.service';
import { useTransactions } from '../core/services/transactions.service';
import { useCredits } from '../core/services/credits.service';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { getTransactionTypeLabel, getTransactionTypeColor } from '../../shared/utils/labels';
import type { TransactionFilter, Transaction } from '../../domain/entities/Transaction';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading, error, loadTransactions } = useTransactions(user?.id || null);
  const { credits } = useCredits(user?.id || null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadTransactions(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, filter]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (key: keyof TransactionFilter, value: string) => {
    setFilter(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const getCreditName = (creditId: string) => {
    const credit = credits.find(c => c.id === creditId);
    return credit ? credit.name : 'Crédito no encontrado';
  };

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transacciones de Crédito</h1>
        <p className="text-gray-600">Historial completo de tus movimientos crediticios</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por descripción
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar transacciones..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de transacción
            </label>
            <select
              value={filter.type || ''}
              onChange={e => handleFilterChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="PAYMENT">Pago</option>
              <option value="DISBURSEMENT">Desembolso</option>
              <option value="INTEREST_CHARGE">Cargo por Intereses</option>
              <option value="FEE">Comisión</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filter.status || ''}
              onChange={e => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="COMPLETED">Completado</option>
              <option value="PENDING">Pendiente</option>
              <option value="FAILED">Fallido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crédito</label>
            <select
              value={filter.creditId || ''}
              onChange={e => handleFilterChange('creditId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los créditos</option>
              {credits.map(credit => (
                <option key={credit.id} value={credit.id}>
                  {credit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8">
            <LoadingSpinner text="Cargando transacciones..." />
          </div>
        ) : error ? (
          <div className="p-8">
            <ErrorMessage message={error} onRetry={() => loadTransactions(filter)} />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crédito
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getCreditName(transaction.creditId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTransactionTypeColor(transaction.type)}`}
                          >
                            {getTransactionTypeLabel(transaction.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={getTransactionTypeColor(transaction.type)}>
                            {transaction.type === 'PAYMENT' ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              transaction.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.status === 'COMPLETED'
                              ? 'Completado'
                              : transaction.status === 'PENDING'
                                ? 'Pendiente'
                                : 'Fallido'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedTransaction(transaction)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        {searchTerm ||
                        Object.keys(filter).some(key => filter[key as keyof TransactionFilter])
                          ? 'No se encontraron transacciones con los filtros aplicados'
                          : 'No hay transacciones disponibles'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detalle de Transacción</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID de Transacción</p>
                    <p className="text-sm text-gray-900">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Número de Referencia</p>
                    <p className="text-sm text-gray-900">
                      {selectedTransaction.referenceNumber || 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Descripción</p>
                  <p className="text-sm text-gray-900">{selectedTransaction.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha</p>
                    <p className="text-sm text-gray-900">{formatDate(selectedTransaction.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tipo</p>
                    <p className="text-sm text-gray-900">
                      {getTransactionTypeLabel(selectedTransaction.type)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monto</p>
                    <p
                      className={`text-lg font-bold ${getTransactionTypeColor(selectedTransaction.type)}`}
                    >
                      {selectedTransaction.type === 'PAYMENT' ? '-' : '+'}
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Saldo Después</p>
                    <p className="text-sm text-gray-900">
                      {formatCurrency(selectedTransaction.balanceAfter)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Crédito Asociado</p>
                  <p className="text-sm text-gray-900">
                    {getCreditName(selectedTransaction.creditId)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
