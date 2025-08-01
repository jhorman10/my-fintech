import React, { memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { SectionSuspenseFallback } from '../components/LazyLoading';

// Lazy load dashboard components
const WelcomeSection = lazy(() => import('../components/dashboard/WelcomeSection'));
const AccountSummary = lazy(() => import('../components/dashboard/AccountSummary'));
const RecentTransactions = lazy(() => import('../components/dashboard/RecentTransactions'));
const QuickActions = lazy(() => import('../components/dashboard/QuickActions'));
const FinancialChart = lazy(() => import('../components/dashboard/FinancialChart'));
const SuggestedProducts = lazy(() => import('../components/dashboard/SuggestedProducts'));

// Dashboard page component with performance optimizations
const DashboardPage: React.FC = memo(() => {
  // Memoized configuration objects
  const dashboardConfig = useMemo(() => ({
    showChart: true,
    maxTransactions: 10,
    refreshInterval: 30000,
  }), []);

  // Memoized handlers
  const handleQuickAction = useCallback((action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions like transfer, pay bills, etc.
  }, []);

  const handleTransactionClick = useCallback((transactionId: string) => {
    console.log('Transaction clicked:', transactionId);
    // Navigate to transaction details
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('Refreshing dashboard data...');
    // Refresh dashboard data
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header section */}
        <div className="dashboard-header mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
            Welcome back! Here's an overview of your financial activity.
          </p>
        </div>

        {/* Main dashboard grid */}
        <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Welcome section */}
            <Suspense fallback={<SectionSuspenseFallback />}>
              <WelcomeSection />
            </Suspense>

            {/* Account summary */}
            <Suspense fallback={<SectionSuspenseFallback />}>
              <AccountSummary />
            </Suspense>

            {/* Financial chart */}
            {dashboardConfig.showChart && (
              <Suspense fallback={<SectionSuspenseFallback />}>
                <FinancialChart />
              </Suspense>
            )}

            {/* Recent transactions */}
            <Suspense fallback={<SectionSuspenseFallback />}>
              <RecentTransactions 
                maxItems={dashboardConfig.maxTransactions}
                onTransactionClick={handleTransactionClick}
                onRefresh={handleRefresh}
              />
            </Suspense>
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Quick actions */}
            <Suspense fallback={<SectionSuspenseFallback />}>
              <QuickActions 
                onActionClick={handleQuickAction}
              />
            </Suspense>

            {/* Suggested products */}
            <Suspense fallback={<SectionSuspenseFallback />}>
              <SuggestedProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
