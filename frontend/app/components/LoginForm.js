import axios from "axios";
import { useState } from "react";

export default function LoginForm({
  backend = "http://localhost:4000",
  onSuccess,
}) {
  const [username, setUsername] = useState(
    process.env.DEMO_USERNAME = "student"
  );
  const [password, setPassword] = useState(
    process.env.DEMO_PASSWORD = "password123"
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await axios.post(`${backend}/auth/login`, {
        username,
        password,
      });
      onSuccess(res.data.token);
    } catch (error) {
      setErr(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-header">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access weather data</p>
      </div>

      <form onSubmit={login}>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          className="login-button" 
          disabled={loading} 
          type="submit"
        >
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Signing in...
            </div>
          ) : (
            "Log in"
          )}
        </button>

        {err && (
          <div className="login-error">
            <p className="login-error-text">{err}</p>
          </div>
        )}
      </form>

      
    </div>
  );
}