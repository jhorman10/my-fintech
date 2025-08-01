import React, { Suspense, lazy } from 'react';
import { SectionSuspenseFallback } from '../components/LazyLoading';

// Función helper para crear lazy components de secciones
export function createLazySection(
  importFn: () => Promise<{ default: React.ComponentType<any> }>
) {
  return lazy(importFn);
}

// HOC para envolver secciones con Suspense
export function withSectionSuspense<P extends object>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent = React.memo((props: P) => (
    <Suspense fallback={<SectionSuspenseFallback />}>
      <Component {...props} />
    </Suspense>
  ));
  
  WrappedComponent.displayName = `withSectionSuspense(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook para preload de componentes lazy
export function usePreloadComponent(
  importFn: () => Promise<any>,
  condition: boolean = true
) {
  React.useEffect(() => {
    if (condition) {
      // Preload cuando la condición se cumple
      importFn();
    }
  }, [importFn, condition]);
}

// Hook para intersección observer con lazy loading
export function useIntersectionLazy<T extends HTMLElement>(
  importFn: () => Promise<any>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const elementRef = React.useRef<T>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          importFn().then(() => setHasLoaded(true));
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [importFn, hasLoaded, options]);

  return { elementRef, isIntersecting, hasLoaded };
}
