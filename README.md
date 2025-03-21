# Weather Dashboard React App

# Purpose of the Application:
- The Weather Dashboard is a React-based web application that allows users to:

- Search for any city and view its current weather conditions.

- See a 5-hour forecast including temperature, humidity, and wind speed.

- Display multiple cities' weather data at once.

- Remove cities from the dashboard.

- Auto-refresh data every 5 minutes.

This app demonstrates how to fetch live data from open APIs and update the UI dynamically using React.

# How Components Are Rendered Dynamically
The application uses a modular component structure:

1. App.js

Main component that manages global state using useState and useEffect.

Calls child components: Header, Request, Displays, and Footer.

Handles API requests and manages auto-refresh logic.

2. Request.js

Allows user input to search for a city.

Calls fetchWeather(city) passed from App.js.

3. Displays.js

Iterates over the weatherData array using .map() to render a Display component for each city.

4. Display.js

Displays the weather info and forecast for one city.

Includes a remove button linked to the onRemove handler passed via props

5. useEffect + setInterval

Enables auto-refresh every 5 minutes to keep data live.

# How to Run the Application Locally
- Prerequisites: Node.js and npm installed
- Installation Steps:
    # 1. Clone the repository
    https://github.com/TranRTC/CSI_340_Final_Project.git

    # 2. Install dependencies
    npm install

    # 3. Start the development server
    npm start
- Access in Browser: Visit: http://localhost:3000

# Testing

This project supports testing with:

Mocha + Chai for unit tests

Cypress for end-to-end UI testing
Run tests with:
# Unit tests: 
    npx mocha ./test/WeatherApp.test.js
# E2E tests
    npx cypress open