import React from 'react';

// Hook para lazy loading de datos
export function useLazyData<T>(
  loadFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await loadFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  }, [loadFn]);

  React.useEffect(() => {
    loadData();
  }, [loadData, ...deps]);

  return { data, loading, error, reload: loadData };
}

// HOC para wrap components con Suspense
export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType
) {
  const WrappedComponent = React.memo((props: P) => (
    <React.Suspense fallback={<FallbackComponent />}>
      <Component {...props} />
    </React.Suspense>
  ));
  
  WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
