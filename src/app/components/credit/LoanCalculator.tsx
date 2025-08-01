import React, { memo, useMemo } from 'react';

interface LoanCalculatorProps {
  amount: number;
  rate: number;
  term: number;
  monthlyPayment: number;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = memo(({ 
  amount, 
  rate, 
  term, 
  monthlyPayment 
}) => {
  const totalInterest = useMemo(() => {
    return (monthlyPayment * term) - amount;
  }, [monthlyPayment, term, amount]);

  const totalPayment = useMemo(() => {
    return monthlyPayment * term;
  }, [monthlyPayment, term]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="loan-calculator bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
        📊 Resumen del Crédito
      </h4>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300">Monto solicitado:</span>
            <span className="font-medium text-blue-900 dark:text-blue-100">
              {formatCurrency(amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300">Cuota mensual:</span>
            <span className="font-medium text-blue-900 dark:text-blue-100">
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300">Total intereses:</span>
            <span className="font-medium text-blue-900 dark:text-blue-100">
              {formatCurrency(totalInterest)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300">Total a pagar:</span>
            <span className="font-bold text-blue-900 dark:text-blue-100">
              {formatCurrency(totalPayment)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400">
          <span>Tasa: {rate}% E.A.</span>
          <span>Plazo: {term} meses</span>
        </div>
      </div>
    </div>
  );
});

LoanCalculator.displayName = 'LoanCalculator';

export default LoanCalculator;
