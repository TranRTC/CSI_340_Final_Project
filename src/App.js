/*
import { useState } from "react";
import Request from "./Components/Request";
import Displays from "./Components/Displays";
import "./App.css";


const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle city search
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Convert city name to latitude/longitude (Geocoding API)
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("City not found");

      // The "geoData" object have many place then only need take first place
      const { lat, lon, display_name } = geoData[0];

      // Fetch weather data using Open-Meteo API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      const weatherJson = await weatherResponse.json();

      // Extract relevant data
      const newCityWeather = {
        city: display_name,
        temperature: weatherJson.current.temperature_2m,
        humidity: weatherJson.current.relative_humidity_2m,
        windSpeed: weatherJson.current.wind_speed_10m,
        lastUpdate: weatherJson.current.time,
        // take 5 record of hour forecast. ( first 5 element from the array)
        forecast: weatherJson.hourly.time.slice(0, 5).map((time, index) => ({
          time,
          temperature: weatherJson.hourly.temperature_2m[index],
          humidity: weatherJson.hourly.relative_humidity_2m[index],
          windSpeed: weatherJson.hourly.wind_speed_10m[index],
        })),
      };

      // Update weather data state
      setWeatherData([...weatherData, newCityWeather]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a city from weatherData
  const removeCity = (cityName) => {
    const updatedWeatherData = weatherData.filter(
      (city) => city.city !== cityName
    );
    setWeatherData(updatedWeatherData);
  };

  return (
    <div className="App">
      <h1>🌤 Weather Dashboard</h1>
      <Request onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Displays weatherData={weatherData} onRemove={removeCity} />
    </div>
  );
};

export default App;


*/
import { useState, useEffect, useCallback } from "react";
import Request from "./Components/Request";
import Displays from "./Components/Displays";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle city search
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Convert city name to latitude/longitude (Geocoding API)
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("City not found");

      // The "geoData" object have many place then only need take first place
      const { lat, lon, display_name } = geoData[0];

      // Fetch weather data using Open-Meteo API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      const weatherJson = await weatherResponse.json();

      // Extract relevant data
      const newCityWeather = {
        city: display_name,
        lat,
        lon,
        temperature: weatherJson.current.temperature_2m,
        humidity: weatherJson.current.relative_humidity_2m,
        windSpeed: weatherJson.current.wind_speed_10m,
        lastUpdate: weatherJson.current.time,
        // take 5 record of hour forecast. ( first 5 element from the array)
        forecast: weatherJson.hourly.time.slice(0, 5).map((time, index) => ({
          time,
          temperature: weatherJson.hourly.temperature_2m[index],
          humidity: weatherJson.hourly.relative_humidity_2m[index],
          windSpeed: weatherJson.hourly.wind_speed_10m[index],
        })),
      };

      // Update weather data state
      setWeatherData([...weatherData, newCityWeather]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update weather data periodically (Auto-refresh) 
  const updateWeather = useCallback(async () => {
    if (weatherData.length === 0) return; // Skip update if no cities

    try {
      const updatedData = await Promise.all(
        weatherData.map(async (cityData) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
          );
          const weatherJson = await response.json();

          return {
            ...cityData,
            temperature: weatherJson.current.temperature_2m,
            humidity: weatherJson.current.relative_humidity_2m,
            windSpeed: weatherJson.current.wind_speed_10m,
            lastUpdate: new Date().toISOString(), // Update timestamp
            forecast: weatherJson.hourly.time.slice(0, 5).map((time, index) => ({
              time,
              temperature: weatherJson.hourly.temperature_2m[index],
              humidity: weatherJson.hourly.relative_humidity_2m[index],
              windSpeed: weatherJson.hourly.wind_speed_10m[index],
            })),
          };
        })
      );
      setWeatherData(updatedData);
    } catch (err) {
      setError("Failed to update weather data.");
    }
  }, [weatherData]);

  // useEffect to auto-refresh weather every 5 minutes
  useEffect(() => {
    if (weatherData.length === 0) return; // Don't run if no cities stored
    const interval = setInterval(updateWeather, 5 * 60 * 1000); // Runs every 5 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, [weatherData, updateWeather]);

  // Function to remove a city from weatherData
  const removeCity = (cityName) => {
    const updatedWeatherData = weatherData.filter(
      (city) => city.city !== cityName
    );
    setWeatherData(updatedWeatherData);
  };

  return (
    <div className="App">
      <h1>🌤 Weather Dashboard</h1>
      <Request onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Displays weatherData={weatherData} onRemove={removeCity} />
    </div>
  );
};

export default App;


