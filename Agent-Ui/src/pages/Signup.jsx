// src/pages/Signup.jsx
import { Link } from "react-router-dom";
import "../App.css";

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  const signInWithGoogle = () => {
    console.log("Google Signup clicked");
    // TODO: Integrate Firebase/Backend OAuth login
  };

  const signInWithGitHub = () => {
    console.log("GitHub Signup clicked");
    // TODO: Integrate Firebase/Backend OAuth login
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-logo">✨</div>
          <div>
            <h1 className="brand-title">Create Account</h1>
            <p className="brand-subtitle">
              Join our platform in less than a minute
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Full name</label>
            <input type="text" placeholder="Your Full Name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              required
            />
          </div>

          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" required />{" "}
              <span>I agree to the Terms & Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="primary-btn">
            Sign up
          </button>

          <p className="divider">OR</p>

          <div className="oauth-buttons">
            <button
              onClick={signInWithGoogle}
              type="button"
              className="oauth-btn google"
            >
              <span>🟦</span> Continue with Google
            </button>

            <button
              onClick={signInWithGitHub}
              type="button"
              className="oauth-btn github"
            >
              <span>🐙</span> Continue with GitHub
            </button>
          </div>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
