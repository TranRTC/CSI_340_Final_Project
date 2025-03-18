import { useState } from "react";

// This component handle user input for adding a city
const Request = ({ onSearch }) => {
  const [city, setCity] = useState("");

  // handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return; // Prevent empty input
    onSearch(city); // Call function to fetch weather data
    setCity(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Request;
