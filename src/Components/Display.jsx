const Display = ({ data, onRemove }) => {
    return (
      <div className="display-card">
        <h2>🏙 {data.city}</h2>
        <p>🌡 Temperature: {data.temperature}°C</p>
        <p>💧 Humidity: {data.humidity}%</p>
        <p>💨 Wind Speed: {data.windSpeed} km/h</p>
        <p>⏳ Last Updated: {data.lastUpdate}</p>
  
        <h3>📅 Hourly Forecast (Next 5 Hours)</h3>
        <ul>
          {data.forecast.slice(0, 5).map((hour, index) => (
            <li key={index}>
              🕐 {hour.time} → 🌡 {hour.temperature}°C, 💧 {hour.humidity}%, 💨 {hour.windSpeed} km/h
            </li>
          ))}
        </ul>
  
        <button onClick={() => onRemove(data.city)}>Remove</button>
      </div>
    );
  };
  
  export default Display;
  