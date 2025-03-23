# Weather Dashboard (React App)

## Purpose
The Weather Dashboard is a React app that allows users to:
- Search and display live weather for multiple cities.
- View current conditions and 5-hour forecasts (temperature, humidity, wind speed).
- Automatically refresh data every 5 minutes.
- Add or remove cities dynamically.

It demonstrates fetching and displaying live data using React and open APIs.

## Component Structure (Dynamic Rendering)

### App.js
- Main component with useState and useEffect.
- Calls: Header, Request, Displays, and Footer.
- Handles API calls and auto-refresh logic.

### Request.js
- User input field to search a city.
- Calls fetchWeather(city) via props.

### Displays.js
- Maps through weatherData to render a Display for each city.

### Display.js
- Displays one city’s weather and forecast.
- Remove button calls onRemove(city).

### Header.js
- Displays the main title or heading for the app.

### Footer.js
- Displays footer information or credits.

### Auto Refresh
- useEffect and setInterval run every 5 minutes to update weather.

## How to Run the App Locally

### Prerequisites:
- Node.js and npm installed

### Steps:
1. Clone the repository:
   https://github.com/TranRTC/CSI_340_Final_Project.git
2. Navigate to the project folder:
   cd CSI_340_Final_Project
3. Install dependencies:
   npm install
4. Start the app:
   npm start
5. Open in browser:
   http://localhost:3000

## Testing

This project supports:
- Mocha + Chai for unit tests
- Cypress for end-to-end tests

### Run Tests:
- Unit tests:
  npx mocha ./test/WeatherApp.js
- E2E tests:
  npx cypress open

## APIs Used
- Open-Meteo (weather data)
- OpenStreetMap Nominatim (city geocoding)

## License
No License

## Acknowledgments
Thanks to Open-Meteo and OpenStreetMap contributors for their free public APIs.

