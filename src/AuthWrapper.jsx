import { useState } from "react";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Onboarding from "./components/Onboarding";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AuthWrapper() {
  const [screen, setScreen] = useState("landing");
  const [userData, setUserData] = useState(null);

  const handleOnboardingComplete = (data) => { setUserData(data); setScreen("app"); };

  if (screen === "app")        return <App userData={userData} onLogout={() => setScreen("landing")} />;
  if (screen === "onboarding") return <Onboarding onComplete={handleOnboardingComplete} />;
  if (screen === "signup")     return <SignupPage onSignup={() => setScreen("onboarding")} onLogin={() => setScreen("login")} />;
  if (screen === "login")      return <LoginPage onLogin={() => setScreen("app")} onSignup={() => setScreen("signup")} />;
  if (screen === "404")        return <NotFoundPage onGoHome={() => setScreen("landing")} />;
  return <LandingPage onLogin={() => setScreen("login")} onSignup={() => setScreen("signup")} />;
}
