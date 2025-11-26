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

  const backend =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const handleLogin = (tk) => {
    setToken(tk);
    setError(null);
  };

  const lookup = async (e) => {
    e.preventDefault();
    setWeather(null);
    setError(null);
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
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Weather App (Next.js + Node backend)</h1>

      {!token ? (
        <LoginForm backend={backend} onSuccess={handleLogin} />
      ) : (
        <>
          <p>Authenticated. Token expires in 1 hour (demo).</p>
          <form onSubmit={lookup} style={{ marginBottom: "1rem" }}>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City name (e.g. Addis Ababa)"
            />
            <button type="submit" style={{ marginLeft: 8 }}>
              Get Weather
            </button>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {weather && <WeatherCard weather={weather} />}
        </>
      )}
    </div>
  );
}
