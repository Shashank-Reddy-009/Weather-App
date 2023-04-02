import React, { useState } from 'react';
import './index.css';

const apiKey = '89828822648360176deb29e7e0ab83cc';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setError('Failed to retrieve weather information');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter a city name" required />
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} &#8451;</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
