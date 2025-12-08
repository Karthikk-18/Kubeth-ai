import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  // Forgot-password mini form
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: real login API here
    console.log("Login form submitted");

    // For hackathon demo -> directly go to dashboard
    navigate("/dashboard");
  };

  const handleForgotClick = () => {
    setShowReset(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;

    alert(`Password reset link sent to: ${resetEmail} (demo)`);
    setShowReset(false);
    setResetEmail("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-logo">🚀</div>
          <div>
            <h1 className="brand-title">Sign in to continue</h1>
            <p className="brand-subtitle">
              Use your account to access the dashboard
            </p>
          </div>
        </div>

        {/* MAIN LOGIN FORM */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="link-btn"
              onClick={handleForgotClick}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-btn">
            Log in
          </button>

          <p className="bottom-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link">
              Create one
            </Link>
          </p>
        </form>

        {/* FORGOT PASSWORD MINI-SECTION */}
        {showReset && (
          <form onSubmit={handleResetSubmit} className="reset-form">
            <p className="reset-text">
              Enter your registered email. We&apos;ll send a reset link
              (demo flow for hackathon).
            </p>
            <input
              className="reset-input"
              type="email"
              placeholder="you@example.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div className="reset-actions">
              <button
                type="button"
                className="link-btn"
                onClick={() => setShowReset(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-btn reset-btn">
                Send reset link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
