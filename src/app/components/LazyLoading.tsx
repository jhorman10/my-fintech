import React from 'react';
import { LoadingSpinner } from './common';

// Componente de loading para lazy loading de páginas
export const PageSuspenseFallback = React.memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center transition-all duration-300">
    <div className="text-center space-y-4">
      <LoadingSpinner size="lg" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          Cargando página...
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Por favor espera un momento
        </p>
      </div>
    </div>
  </div>
));

PageSuspenseFallback.displayName = 'PageSuspenseFallback';

// Componente de loading más pequeño para secciones
export const SectionSuspenseFallback = React.memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center space-y-3">
      <LoadingSpinner size="md" />
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Cargando...
      </p>
    </div>
  </div>
));

SectionSuspenseFallback.displayName = 'SectionSuspenseFallback';

// Componente de error para lazy loading
export const LazyErrorFallback = React.memo(({ error }: { error?: Error }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center transition-all duration-300">
    <div className="text-center space-y-4 p-8">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Error cargando página
        </h3>
        <p className="text-sm text-red-600 dark:text-red-400 max-w-md">
          {error?.message || 'Ha ocurrido un error inesperado al cargar la página'}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Recargar página
        </button>
      </div>
    </div>
  </div>
));

LazyErrorFallback.displayName = 'LazyErrorFallback';
