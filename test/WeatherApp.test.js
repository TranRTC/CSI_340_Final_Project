import { expect } from "chai";
import { fetchWeather, updateWeather, removeCity } from "../src/App";  //  Keep only this one

describe("Weather App Unit Tests", () => {
  
  it("should fetch weather data for a valid city", async () => {
    const city = "Seattle";
    const data = await fetchWeather(city);
    expect(data).to.have.property("city").that.equals("Seattle");
    expect(data).to.have.property("temperature");
    expect(data).to.have.property("humidity");
  });

  it("should update weather data for stored cities", async () => {
    const weatherData = [{ city: "New York", lat: 40.7128, lon: -74.006 }];
    const updatedData = await updateWeather(weatherData);
    expect(updatedData).to.be.an("array").that.is.not.empty;
    expect(updatedData[0]).to.have.property("temperature");
  });

  it("should remove a city from weatherData", () => {
    const weatherData = [{ city: "Seattle" }, { city: "New York" }];
    const updatedData = removeCity("Seattle", weatherData);
    expect(updatedData).to.be.an("array").with.lengthOf(1);
    expect(updatedData[0].city).to.equal("New York");
  });
});
