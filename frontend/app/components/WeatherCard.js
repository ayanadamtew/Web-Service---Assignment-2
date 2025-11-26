export default function WeatherCard({ weather }) {
  if (!weather) return null;
  
  return (
    <div className="weather-data-card">
      <div className="weather-data-header">
        <h2 className="weather-location">{weather.location}</h2>
        <p className="weather-description">{weather.description}</p>
      </div>

      <div className="weather-grid">
        <div className="weather-metric metric-blue">
          <p className="metric-label">Temperature</p>
          <p className="metric-value">{weather.tempC}°C</p>
          <p className="metric-subvalue">{weather.tempF}°F</p>
        </div>
        
        <div className="weather-metric metric-green">
          <p className="metric-label">Feels Like</p>
          <p className="metric-value">{weather.feels_likeC}°C</p>
        </div>
        
        <div className="weather-metric metric-yellow">
          <p className="metric-label">Wind</p>
          <p className="metric-value">{weather.windKph} km/h</p>
        </div>
        
        <div className="weather-metric metric-purple">
          <p className="metric-label">Humidity</p>
          <p className="metric-value">{weather.humidity}%</p>
        </div>
      </div>

      <div className="weather-sun-times">
        <div className="sun-time">
          <p>🌅 Sunrise</p>
          <p className="sun-time-value">{weather.sunrise}</p>
        </div>
        <div className="sun-time">
          <p>🌇 Sunset</p>
          <p className="sun-time-value">{weather.sunset}</p>
        </div>
      </div>

      <details className="weather-details">
        <summary className="weather-details-summary">
          Raw response (debug)
        </summary>
        <pre className="weather-details-pre">
          {JSON.stringify(weather.raw, null, 2)}
        </pre>
      </details>
    </div>
  );
}