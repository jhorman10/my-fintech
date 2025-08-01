import React, { memo } from 'react';
import { LoadingSpinner } from './common';

// Loading boundaries para Suspense
export const PageLoadingFallback = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
    <div className="text-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-slate-600 dark:text-slate-400 font-medium">
        Cargando datos...
      </p>
    </div>
  </div>
));

PageLoadingFallback.displayName = 'PageLoadingFallback';

export const SectionLoadingFallback = memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center space-y-3">
      <LoadingSpinner size="md" />
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Cargando...
      </p>
    </div>
  </div>
));

SectionLoadingFallback.displayName = 'SectionLoadingFallback';

export const CardLoadingFallback = memo(() => (
  <div className="animate-pulse">
    <div className="bg-slate-200 dark:bg-slate-700 rounded-lg h-32 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-slate-200 dark:bg-slate-700 rounded h-4 w-3/4"></div>
      <div className="bg-slate-200 dark:bg-slate-700 rounded h-4 w-1/2"></div>
    </div>
  </div>
));

CardLoadingFallback.displayName = 'CardLoadingFallback';

// Error boundary para manejar errores en Suspense
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class SuspenseErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ComponentType<{ error: Error }> }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{ fallback?: React.ComponentType<{ error: Error }> }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Suspense Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback = memo(({ error }: { error: Error }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
    <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <span className="font-medium">Error cargando datos</span>
    </div>
    <p className="mt-2 text-sm text-red-700 dark:text-red-300">
      {error.message}
    </p>
  </div>
));

DefaultErrorFallback.displayName = 'DefaultErrorFallback';
