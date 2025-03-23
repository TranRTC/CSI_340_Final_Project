const { assert } = require("chai");


// test the remove city function. The function is moved here to test the logic independently and not
// affected by states variable in App.js component

function removeCity(cityName, weatherData) {
  return weatherData.filter((city) => city.city !== cityName);
}

describe("removeCity Unit Test", () => {
  it("should remove the specified city from the array", () => {
    const weatherData = [
      { city: "Seattle" },
      { city: "New York" },
      { city: "Tokyo" }
    ];

    const result = removeCity("New York", weatherData);

    assert.isArray(result);
    assert.lengthOf(result, 2);
    assert.deepEqual(result, [
      { city: "Seattle" },
      { city: "Tokyo" }
    ]);
  });
});
