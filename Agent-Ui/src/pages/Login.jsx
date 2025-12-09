// src/pages/Login.jsx
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your backend login API here
    console.log("Login form submitted");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-logo">🚀</div>
          <div>
            <h1 className="brand-title">Hackathon Portal</h1>
            <p className="brand-subtitle">Sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <button type="button" className="link-btn">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-btn">
            Log in
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-row">
            <button type="button" className="ghost-btn">
              Google
            </button>
            <button type="button" className="ghost-btn">
              GitHub
            </button>
          </div>

          <p className="bottom-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
