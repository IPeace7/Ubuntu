import React, { useState } from 'react';
import MessagesPage from './components/Messages';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('Messages');

  // Render main content panel depending on the selected tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'Messages':
        return <MessagesPage activeTab={activeTab} setActiveTab={setActiveTab} />;

      case 'Home':
        // Renders your existing Dashboard component when Home is clicked
        return (
          <div className="flex-1 flex overflow-hidden">
            <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        );

      default:
        // Placeholder view for other tabs (Journal, Communities, Saved, etc.)
        return (
          <div className="flex-1 p-8 bg-[#F5F6FA] flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
              <h2 className="text-2xl font-bold text-[#1E2340] mb-2">{activeTab}</h2>
              <p className="text-gray-500 text-sm mb-6">
                You are currently viewing the {activeTab} section.
              </p>
              <button
                onClick={() => setActiveTab('Messages')}
                className="px-5 py-2.5 bg-[#5E4BE2] hover:bg-[#4B38C9] text-white text-sm font-semibold rounded-xl transition"
              >
                Back to Messages
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex w-full">
      {renderMainContent()}
    </div>
  );
}