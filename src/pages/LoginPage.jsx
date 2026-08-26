import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/Logo.svg";

export default function LoginPage({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="auth-shell">
      {/* LEFT PANEL */}
      <div className="auth-left" style={{ backgroundImage: "url(/login-bg.png)" }}>
        <div className="auth-left-overlay" />
        <img src={logo} alt="Inside Out" className="auth-logo" />
        <div className="auth-left-content">
          <h1 className="auth-headline">
            Welcome back.<br />
            <span className="auth-highlight">We missed you.</span>
          </h1>
          <div className="auth-divider" />
          <p className="auth-sub">
            Pick up where you left off.<br />
            Your space is always here for you.
          </p>
          <div className="auth-badge">
            <Lock size={15} />
            <span>A safe space. Real people.<br />Here for you, always.</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <img src={logo} alt="Inside Out" className="auth-form-logo" />
        <h2 className="auth-form-title">Welcome back</h2>
        <p className="auth-form-sub">Sign in to continue your journey.</p>

        <div className="auth-field">
          <label>Email Address</label>
          <div className="auth-input-wrap">
            <Mail size={16} className="auth-input-icon" />
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input-wrap">
            <Lock size={16} className="auth-input-icon" />
            <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="auth-eye" onClick={() => setShowPass(v => !v)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          <div className="auth-forgot"><button>Forgot password?</button></div>
        </div>

        <label className="auth-checkbox">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
          <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</span>
        </label>

        <button className="auth-submit" onClick={onLogin}>Sign In</button>

        <div className="auth-or">or continue with</div>
        <button className="auth-google">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Sign in with Google
        </button>

        <p className="auth-switch">Don't have an account? <button onClick={onSignup}>Sign Up</button></p>
      </div>
    </div>
  );
}
