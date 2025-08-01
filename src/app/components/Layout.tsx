import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirigir al login después del logout exitoso
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  FinTech Pro
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-2">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/dashboard')
                    ? 'bg-blue-500/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300 shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/transactions"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/transactions')
                    ? 'bg-blue-500/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300 shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                💳 Transacciones
              </Link>
              <Link
                to="/apply-credit"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/apply-credit')
                    ? 'bg-blue-500/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300 shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                🚀 Solicitar
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {user?.name}
                  </span>
                </div>
              </div>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                title="Cerrar Sesión"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:block">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-2 py-3">
            <Link
              to="/dashboard"
              className={`text-sm font-semibold whitespace-nowrap px-3 py-2 rounded-xl transition-all ${
                isActive('/dashboard')
                  ? 'text-blue-700 bg-blue-500/20 dark:text-blue-300 dark:bg-blue-400/20'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`text-sm font-semibold whitespace-nowrap px-3 py-2 rounded-xl transition-all ${
                isActive('/transactions')
                  ? 'text-blue-700 bg-blue-500/20 dark:text-blue-300 dark:bg-blue-400/20'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              💳 Transacciones
            </Link>
            <Link
              to="/apply-credit"
              className={`text-sm font-semibold whitespace-nowrap px-3 py-2 rounded-xl transition-all ${
                isActive('/apply-credit')
                  ? 'text-blue-700 bg-blue-500/20 dark:text-blue-300 dark:bg-blue-400/20'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              🚀 Solicitar
            </Link>
            {/* <button
              onClick={handleLogout}
              className="text-sm font-semibold whitespace-nowrap px-3 py-2 rounded-xl bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/30 transition-all flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Salir</span>
            </button> */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
