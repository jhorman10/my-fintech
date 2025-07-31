import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCredits } from '../hooks/useCredits';
import { useTransactions } from '../hooks/useTransactions';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { formatCurrency, formatDate, calculateDaysUntil } from '../../shared/utils/formatters';
import {
  getCreditTypeLabel,
  getTransactionTypeLabel,
  getTransactionTypeColor,
} from '../../shared/utils/labels';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    credits,
    summary,
    loading: creditsLoading,
    error: creditsError,
  } = useCredits(user?.id || null);
  const { recentTransactions, loading: transactionsLoading } = useTransactions(user?.id || null);
  const { products, loading: productsLoading } = useProducts();

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {user.name} {user.lastName}
        </h1>
        <p className="text-gray-600">Aquí tienes un resumen de tu actividad financiera</p>
      </div>

      {/* Summary Cards */}
      {creditsLoading ? (
        <LoadingSpinner text="Cargando resumen..." />
      ) : creditsError ? (
        <ErrorMessage message={creditsError} />
      ) : summary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Créditos</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deuda Total</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(summary.totalDebt)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasa Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.averageInterestRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Próximo Pago</p>
                <p className="text-lg font-bold text-gray-900">
                  {summary.nextPaymentDate ? (
                    <span>{calculateDaysUntil(summary.nextPaymentDate)} días</span>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Credits */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Créditos Activos</h2>
          </div>
          <div className="p-6">
            {creditsLoading ? (
              <LoadingSpinner size="sm" />
            ) : credits.length > 0 ? (
              <div className="space-y-4">
                {credits.map(credit => (
                  <div key={credit.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{credit.name}</h3>
                        <p className="text-sm text-gray-500">{getCreditTypeLabel(credit.type)}</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {credit.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Saldo Pendiente</p>
                        <p className="font-medium">{formatCurrency(credit.currentBalance)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Próximo Pago</p>
                        <p className="font-medium">{formatDate(credit.nextPaymentDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No tienes créditos activos</p>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h2>
          </div>
          <div className="p-6">
            {transactionsLoading ? (
              <LoadingSpinner size="sm" />
            ) : recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type === 'PAYMENT' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getTransactionTypeLabel(transaction.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay transacciones recientes</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Productos Sugeridos</h2>
        </div>
        <div className="p-6">
          {productsLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    <p>Tasa desde {product.interestRate}%</p>
                    <p>Hasta {formatCurrency(product.maxAmount)}</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                    Más información
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
