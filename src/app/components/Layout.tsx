import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!user) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                FinTech Pro
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/transactions"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/transactions')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Transacciones de Crédito
              </Link>
              <Link
                to="/apply-credit"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/apply-credit')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Solicitar Crédito
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user.name} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link
              to="/dashboard"
              className={`text-sm font-medium ${
                isActive('/dashboard')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-500'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`text-sm font-medium ${
                isActive('/transactions')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-500'
              }`}
            >
              Transacciones
            </Link>
            <Link
              to="/apply-credit"
              className={`text-sm font-medium ${
                isActive('/apply-credit')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-500'
              }`}
            >
              Solicitar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
