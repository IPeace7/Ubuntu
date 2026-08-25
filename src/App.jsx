import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState(null);

  // Called when the user clicks "Go to Home" on Step 6
  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD]">
      {!isOnboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard userData={userData} />
      )}
    </div>
  );
}