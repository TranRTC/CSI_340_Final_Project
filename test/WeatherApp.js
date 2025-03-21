const { assert } = require("chai");
const { fetchWeather } = require("../src/App.js");  // Use require instead of import

describe("Weather App Basic Tests", () => {
  
  it("should fetch weather data for a valid city", async () => {
    const city = "Seattle";
    const data = await fetchWeather(city);
    
    assert.property(data, "city");
    assert.isString(data.city);
    assert.property(data, "temperature");
    assert.isNumber(data.temperature);
  });
});
