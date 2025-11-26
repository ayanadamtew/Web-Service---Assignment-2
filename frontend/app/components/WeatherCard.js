export default function WeatherCard({ weather }) {
  if (!weather) return null;
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h2>{weather.location}</h2>
      <p>
        <strong>{weather.description}</strong>
      </p>
      <p>
        Temp: {weather.tempC}°C ({weather.tempF}°F)
      </p>
      <p>Feels like: {weather.feels_likeC}°C</p>
      <p>Wind: {weather.windKph} km/h</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Sunrise: {weather.sunrise}</p>
      <p>Sunset: {weather.sunset}</p>
      <details>
        <summary>Raw response (debug)</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(weather.raw, null, 2)}
        </pre>
      </details>
    </div>
  );
}
