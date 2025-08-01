import React, { memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface WelcomeSectionProps {
  // Add props interface if needed in the future
}

const WelcomeSection: React.FC<WelcomeSectionProps> = memo(() => {
  return (
    <div className="welcome-section bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
      <p className="text-blue-100">
        Here's what's happening with your finances today.
      </p>
    </div>
  );
});

WelcomeSection.displayName = 'WelcomeSection';

export default WelcomeSection;
