import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Lock, Shield, Heart, Eye, Users, Sparkles 
} from 'lucide-react';
import logo from '../assets/Logo.svg';

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [reasons, setReasons] = useState([]);
  const [identityMode, setIdentityMode] = useState('Public');
  const [topics, setTopics] = useState(['Stress', 'Family', 'Self-growth']);

  const REASON_OPTIONS = [
    { id: 'chat', text: 'Someone to talk to' },
    { id: 'peers', text: 'People who understand me' },
    { id: 'share', text: 'A place to share my experience' },
    { id: 'journal', text: 'Somewhere to journal' },
    { id: 'learn', text: 'Learn more about myself' },
    { id: 'pro', text: 'Find professional support' },
    { id: 'explore', text: "I'm just exploring" }
  ];

  const TOPIC_OPTIONS = [
    { id: 'Stress', label: 'Stress' },
    { id: 'Family', label: 'Family' },
    { id: 'Friendships', label: 'Friendships' },
    { id: 'School', label: 'School' },
    { id: 'Relationships', label: 'Relationships' },
    { id: 'Confidence', label: 'Confidence' },
    { id: 'Loneliness', label: 'Loneliness' },
    { id: 'Life changes', label: 'Life changes' },
    { id: 'Self-growth', label: 'Self-growth' },
    { id: 'Other', label: 'Other' }
  ];

  const toggleReason = (id) => {
    setReasons(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleTopic = (label) => {
    setTopics(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] flex flex-col justify-between p-6 antialiased font-sans">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between py-2">
        {currentStep > 1 && currentStep < 6 ? (
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : <div />}
        
        <div className="flex items-center gap-1.5 cursor-pointer">
          <img src={logo} alt="Inside Out" className="h-16 w-auto" />
        </div>

        <div className="w-8" />
      </div>

      {/* Screen Steps Container */}
      <div className="w-full max-w-md mx-auto my-auto py-6">
        {currentStep === 1 && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                A space to <br />
                <span className="text-purple-600">let it out.</span>
              </h1>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Share, reflect, connect, and find support at your own pace.
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                Whatever you're going through, you don't have to put it into perfect words.
              </p>
            </div>

            <div className="relative w-48 h-48 mx-auto bg-purple-100/50 rounded-full flex items-center justify-center my-6">
              <div className="w-32 h-32 bg-purple-200/50 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-purple-600 fill-purple-200" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <Lock className="w-3 h-3" />
              <span>Your privacy matters. You choose what you share.</span>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">What brings you here?</h2>
              <p className="text-sm text-gray-400">Choose all that apply.</p>
            </div>

            <div className="space-y-2">
              {REASON_OPTIONS.map((item) => {
                const isSelected = reasons.includes(item.id);
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleReason(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition text-sm font-medium ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-50/60 text-purple-900' 
                        : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <span>{item.text}</span>
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => {}}
                      className="accent-purple-600 w-4 h-4 rounded"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">How would you like to be seen?</h2>
              <p className="text-sm text-gray-400">You can change this anytime.</p>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => setIdentityMode('Public')}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  identityMode === 'Public' 
                    ? 'border-purple-500 bg-purple-50/50 ring-1 ring-purple-500' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-100 rounded-xl text-purple-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">As myself</p>
                    <p className="text-[11px] text-gray-400">People can see the profile name you choose.</p>
                  </div>
                </div>
                {identityMode === 'Public' && (
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div 
                onClick={() => setIdentityMode('Anonymous')}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  identityMode === 'Anonymous' 
                    ? 'border-purple-500 bg-purple-50/50 ring-1 ring-purple-500' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-100 rounded-xl text-gray-600">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Anonymously</p>
                    <p className="text-[11px] text-gray-400">Your identity stays hidden from other users.</p>
                  </div>
                </div>
                {identityMode === 'Anonymous' && (
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">What would you like to explore?</h2>
              <p className="text-sm text-gray-400">Choose topics that feel relevant to you.</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {TOPIC_OPTIONS.map((topic) => {
                const isSelected = topics.includes(topic.label);
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.label)}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition ${
                      isSelected 
                        ? 'border-purple-400 bg-purple-50 text-purple-900' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{topic.label}</span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">A safe space for everyone</h2>
              <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                Inside Out is a place to share and connect, but it isn't a replacement for professional mental-health care.
              </p>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-xs">
              <div className="flex gap-3">
                <Heart className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800">Be respectful.</p>
                  <p className="text-gray-400 text-[11px]">Treat everyone with kindness.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800">Protect other people's privacy.</p>
                  <p className="text-gray-400 text-[11px]">What's shared here, stays here.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800">Don't judge or encourage harmful behavior.</p>
                  <p className="text-gray-400 text-[11px]">We're here to support, not to bring others down.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">You're all set!</h2>
              <p className="text-xs text-gray-500">Welcome to Inside Out.</p>
              <p className="text-xs font-semibold text-purple-700">You're not alone here.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between pt-4 border-t border-gray-100">
        {currentStep === 1 ? (
          <button 
            onClick={() => onComplete({ identityMode, topics })}
            className="text-xs font-medium text-gray-400 hover:text-gray-700"
          >
            Skip
          </button>
        ) : (
          <button 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div 
              key={step} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep === step ? 'w-5 bg-purple-600' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {currentStep < 5 && (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition shadow-sm"
          >
            <span>Next</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}

        {currentStep === 5 && (
          <button
            onClick={() => setCurrentStep(6)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition shadow-sm"
          >
            <span>I understand</span>
            <Check className="w-3 h-3" />
          </button>
        )}

        {currentStep === 6 && (
          <button
            onClick={() => onComplete({ identityMode, topics })}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            <span>Go to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}