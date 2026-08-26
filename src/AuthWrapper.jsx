import { useState } from "react";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Onboarding from "./components/Onboarding";
import LandingPage from "./pages/LandingPage";

export default function AuthWrapper() {
  const [screen, setScreen] = useState("landing");
  const [userData, setUserData] = useState(null);

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setScreen("app");
  };

  if (screen === "app")        return <App userData={userData} />;
  if (screen === "onboarding") return <Onboarding onComplete={handleOnboardingComplete} />;
  if (screen === "signup")     return <SignupPage onSignup={() => setScreen("onboarding")} onLogin={() => setScreen("login")} />;
  if (screen === "login")      return <LoginPage onLogin={() => setScreen("app")} onSignup={() => setScreen("signup")} />;
  return <LandingPage onLogin={() => setScreen("login")} onSignup={() => setScreen("signup")} />;
}
