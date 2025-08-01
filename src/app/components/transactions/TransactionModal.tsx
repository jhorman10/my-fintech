import React, { memo, useCallback } from 'react';

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

interface TransactionModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = memo(({ 
  transaction, 
  isOpen, 
  onClose 
}) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  }, []);

  const formatDateTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 sm:mx-0 sm:h-10 sm:w-10">
                <span className="text-2xl">{getTypeIcon(transaction.type)}</span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Detalle de Transacción
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Información completa de la transacción seleccionada
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-auto flex-shrink-0 bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Cerrar modal"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 px-4 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-4">
              {/* Transaction Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Descripción
                </h4>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
              </div>

              {/* Amount */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Monto
                </h4>
                <p className={`mt-1 text-2xl font-bold ${
                  transaction.amount > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {transaction.type}
                </p>
              </div>

              {/* Date and Time */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Fecha y Hora
                </h4>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {formatDateTime(transaction.date)}
                </p>
              </div>

              {/* Credit Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Tipo de Crédito
                </h4>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {transaction.creditType}
                </p>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Estado
                </h4>
                <span className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>

              {/* Reference */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Referencia
                </h4>
                <p className="mt-1 text-gray-900 dark:text-white font-mono">
                  {transaction.reference}
                </p>
              </div>

              {/* Credit ID */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  ID de Crédito
                </h4>
                <p className="mt-1 text-gray-900 dark:text-white font-mono">
                  {transaction.creditId}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Descargar Comprobante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

TransactionModal.displayName = 'TransactionModal';

export default TransactionModal;
