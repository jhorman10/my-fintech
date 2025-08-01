import React, { memo, useMemo, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FinancialChartProps {
  // Add props interface if needed in the future
}

const FinancialChart: React.FC<FinancialChartProps> = memo(() => {
  // Mock chart data específico para fintech con montos en COP
  const chartData = useMemo(() => ({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    income: [3500000, 3600000, 3550000, 3700000, 3650000, 3800000],
    expenses: [2800000, 2900000, 2750000, 3100000, 2950000, 3200000],
    debt: [198500000, 195000000, 191500000, 188000000, 184500000, 181000000], // Deuda total descendente
  }), []);

  const maxValue = useMemo(() => {
    return Math.max(...chartData.income, ...chartData.expenses);
  }, [chartData]);

  const totalSavings = useMemo(() => {
    return chartData.income.reduce((total, income, index) => {
      return total + (income - chartData.expenses[index]);
    }, 0);
  }, [chartData]);

  const averageIncome = useMemo(() => {
    return chartData.income.reduce((sum, val) => sum + val, 0) / chartData.income.length;
  }, [chartData]);

  const averageExpenses = useMemo(() => {
    return chartData.expenses.reduce((sum, val) => sum + val, 0) / chartData.expenses.length;
  }, [chartData]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  const handleDetailedAnalytics = useCallback(() => {
    console.log('Navigating to detailed analytics...');
    // Navigate to detailed analytics page
  }, []);

  return (
    <section className="financial-chart bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <header className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen Financiero
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Evolución de ingresos vs gastos últimos 6 meses
        </p>
      </header>

      {/* Métricas Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Ahorro Total</p>
          <p className="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400 break-all">
            {formatCurrency(totalSavings)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Ingreso Promedio</p>
          <p className="text-sm sm:text-lg font-bold text-blue-600 dark:text-blue-400 break-all">
            {formatCurrency(averageIncome)}
          </p>
        </div>
        <div className="text-center sm:col-span-2 md:col-span-1">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Gasto Promedio</p>
          <p className="text-sm sm:text-lg font-bold text-orange-600 dark:text-orange-400 break-all">
            {formatCurrency(averageExpenses)}
          </p>
        </div>
      </div>
      
      <div className="chart-container overflow-x-auto">
        {/* Gráfico de barras mejorado */}
        <div className="flex items-end justify-between h-32 sm:h-40 md:h-48 mb-4 px-2 min-w-[320px]">
          {chartData.labels.map((label, index) => {
            const incomeHeight = (chartData.income[index] / maxValue) * 100;
            const expenseHeight = (chartData.expenses[index] / maxValue) * 100;
            
            return (
              <div key={label} className="flex flex-col items-center space-y-1 sm:space-y-2 group flex-1">
                <div className="flex items-end space-x-0.5 sm:space-x-1 justify-center">
                  <div
                    className="bg-green-500 hover:bg-green-600 rounded-t w-4 sm:w-5 md:w-6 transition-colors cursor-pointer"
                    style={{ height: `${Math.max(incomeHeight * 1.2, 8)}px` }}
                    title={`Ingresos ${label}: ${formatCurrency(chartData.income[index])}`}
                    role="img"
                    aria-label={`Ingresos de ${label}: ${formatCurrency(chartData.income[index])}`}
                  />
                  <div
                    className="bg-red-500 hover:bg-red-600 rounded-t w-4 sm:w-5 md:w-6 transition-colors cursor-pointer"
                    style={{ height: `${Math.max(expenseHeight * 1.2, 8)}px` }}
                    title={`Gastos ${label}: ${formatCurrency(chartData.expenses[index])}`}
                    role="img"
                    aria-label={`Gastos de ${label}: ${formatCurrency(chartData.expenses[index])}`}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {label}
                </span>
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 dark:text-gray-400 text-center">
                  <div className="break-all">+{formatCurrency(chartData.income[index] - chartData.expenses[index])}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Leyenda mejorada */}
        <div className="flex justify-center space-x-4 sm:space-x-8 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Ingresos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Gastos</span>
          </div>
        </div>

        {/* Indicador de tendencia */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 dark:text-blue-400">📈</span>
              <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300">
                Tendencia Positiva
              </span>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 break-all">
              Ahorro promedio: {formatCurrency(totalSavings / 6)}/mes
            </span>
          </div>
        </div>
      </div>
      
      <footer className="text-center">
        <button 
          onClick={handleDetailedAnalytics}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium text-sm sm:text-base"
        >
          Ver análisis detallado →
        </button>
      </footer>
    </section>
  );
});

FinancialChart.displayName = 'FinancialChart';

export default FinancialChart;
