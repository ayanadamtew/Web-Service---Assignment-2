"use client";

import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const [token, setToken] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const handleLogin = (tk) => {
    setToken(tk);
    setError(null);
  };

  const handleLogout = () => {
    setToken(null);
    setWeather(null);
    setError(null);
    setCity('');
  };

  const lookup = async (e) => {
    e.preventDefault();
    setWeather(null);
    setError(null);
    setLoading(true);
    
    try {
      const res = await axios.get(`${backend}/api/weather`, {
        params: { city },
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeather(res.data.data);
    } catch (err) {
      if (err.response)
        setError(err.response.data.error || JSON.stringify(err.response.data));
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-wrapper">
        <div className="weather-header">
          <h1 className="weather-title">Weather App</h1>
        </div>

        {!token ? (
          <LoginForm backend={backend} onSuccess={handleLogin} />
        ) : (
          <div className="weather-card">
            <div className="auth-status">  
                <div>      
                  <p>✅ Authenticated successfully</p>
                  <p>Token expires in 1 hour</p>
                </div>
                <div>
                <button 
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
                </div>
            </div>

            <form onSubmit={lookup} className="weather-form">
              <div className="form-group">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name (e.g. Addis Ababa)"
                  className="weather-input"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="weather-button"
                >
                  {loading ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      Loading...
                    </div>
                  ) : (
                    "Get Weather"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="error-message">
                <p className="error-title">Error:</p>
                <p className="error-text">{error}</p>
              </div>
            )}

            {weather && <WeatherCard weather={weather} />}

            {!weather && !error && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🌤️</div>
                <h3 className="empty-title">
                  Enter a city name to get weather information
                </h3>
                <p className="empty-subtitle">
                  Try searching for cities like "Addis Ababa", "London", or "Tokyo"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}