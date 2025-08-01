import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './app/components/Layout';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { AuthProvider, useAuth } from './app/hooks/useAuth';
import { LoadingSpinner } from './app/components/common';
import { ThemeProvider } from './app/hooks/useTheme';
import { PageSuspenseFallback } from './app/components/LazyLoading';
import { LazyErrorBoundary } from './app/components/LazyErrorBoundary';

// Lazy load de todas las páginas
const LoginPage = lazy(() => import('./app/pages/LoginPage'));
const DashboardPage = lazy(() => import('./app/pages/DashboardPage'));
const TransactionsPage = lazy(() => import('./app/pages/TransactionsPage'));
const ApplyCreditPage = lazy(() => import('./app/pages/ApplyCreditPage'));
const NotFoundPage = lazy(() => import('./app/pages/NotFoundPage'));

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        <LoadingSpinner text="Cargando aplicación..." />
      </div>
    );
  }

  return (
    <LazyErrorBoundary>
      <Router>
        <Suspense fallback={<PageSuspenseFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-credit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ApplyCreditPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </LazyErrorBoundary>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
