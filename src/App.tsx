import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './app/components/Layout';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { LoginPage } from './app/pages/LoginPage';
import { DashboardPage } from './app/pages/DashboardPage';
import { TransactionsPage } from './app/pages/TransactionsPage';
import { ApplyCreditPage } from './app/pages/ApplyCreditPage';
import { NotFoundPage } from './app/pages/NotFoundPage';
import { useAuth } from './app/hooks/useAuth';
import { LoadingSpinner } from './app/components/common';
import './App.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Cargando aplicación..." />
      </div>
    );
  }

  return (
    <Router>
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
    </Router>
  );
}

export default App;
