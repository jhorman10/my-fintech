import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './app/components/Layout';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { LoginPage } from './app/pages/LoginPage';
import { DashboardPage } from './app/pages/DashboardPage';
import { TransactionsPage } from './app/pages/TransactionsPage';
import { ApplyCreditPage } from './app/pages/ApplyCreditPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-credit"
            element={
              <ProtectedRoute>
                <ApplyCreditPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
