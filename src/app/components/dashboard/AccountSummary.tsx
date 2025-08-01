import React, { memo, useMemo, useCallback } from 'react';

interface Credit {
  id: string;
  type: string;
  originalAmount: number;
  pendingBalance: number;
  nextPaymentDate: string;
  monthlyPayment: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AccountSummaryProps {
  // Add props interface if needed in the future
}

const AccountSummary: React.FC<AccountSummaryProps> = memo(() => {
  // Mock data para créditos activos según requisitos de la prueba
  const activeCredits = useMemo<Credit[]>(() => [
    {
      id: '1',
      type: 'Préstamo Hipotecario',
      originalAmount: 250000000,
      pendingBalance: 180000000,
      nextPaymentDate: '2024-02-15',
      monthlyPayment: 1250000
    },
    {
      id: '2',
      type: 'Préstamo de Coche',
      originalAmount: 35000000,
      pendingBalance: 15000000,
      nextPaymentDate: '2024-02-10',
      monthlyPayment: 480000
    },
    {
      id: '3',
      type: 'Tarjeta de Crédito',
      originalAmount: 10000000,
      pendingBalance: 3500000,
      nextPaymentDate: '2024-02-05',
      monthlyPayment: 150000
    }
  ], []);

  const totalDebt = useMemo(() => {
    return activeCredits.reduce((total, credit) => total + credit.pendingBalance, 0);
  }, [activeCredits]);

  const totalMonthlyPayment = useMemo(() => {
    return activeCredits.reduce((total, credit) => total + credit.monthlyPayment, 0);
  }, [activeCredits]);

  const handleCreditClick = useCallback((creditId: string) => {
    console.log('Credit clicked:', creditId);
    // Navigate to credit details
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const getProgressPercentage = useCallback((original: number, pending: number) => {
    return ((original - pending) / original) * 100;
  }, []);

  return (
    <section className="account-summary bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Créditos Activos y Deuda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Deuda Total</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalDebt)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pago Mensual Total</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalMonthlyPayment)}
            </p>
          </div>
        </div>
      </header>

      <div className="credits-list space-y-4">
        {activeCredits.map((credit) => {
          const progressPercentage = getProgressPercentage(credit.originalAmount, credit.pendingBalance);
          
          return (
            <article
              key={credit.id}
              onClick={() => handleCreditClick(credit.id)}
              className="credit-card p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCreditClick(credit.id);
                }
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {credit.type}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Próximo pago: {formatDate(credit.nextPaymentDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(credit.pendingBalance)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    de {formatCurrency(credit.originalAmount)}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progreso de pago</span>
                  <span>{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Cuota mensual:
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(credit.monthlyPayment)}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          Ver todos los créditos
        </button>
      </footer>
    </section>
  );
});

AccountSummary.displayName = 'AccountSummary';

export default AccountSummary;
