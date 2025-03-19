describe("Weather Dashboard E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Visit the root of the application
  });

  it("should load the app and display the title", () => {
    cy.contains("🌤 Weather Dashboard").should("be.visible");
  });

  it("should allow users to search for a city and display weather data", () => {
    cy.get("input").type("Seattle");
    cy.contains("Search").click();
    
    // Verify city appears in the dashboard
    cy.contains("Seattle").should("exist");
    cy.contains("Temperature").should("exist");
    cy.contains("Humidity").should("exist");
    cy.contains("Wind Speed").should("exist");
  });

  it("should allow users to remove a city from the dashboard", () => {
    cy.get("input").type("New York");
    cy.contains("Search").click();
    cy.contains("New York").should("exist");
    
    cy.contains("Remove").click();
    cy.contains("New York").should("not.exist");
  });

  it("should auto-refresh weather data every 5 minutes", () => {
    cy.get("input").type("Los Angeles");
    cy.contains("Search").click();
    cy.contains("Los Angeles").should("exist");
    
    // Wait for 5 minutes (simulated)
    cy.wait(5 * 60 * 1000);
    
    // Check if weather data updates
    cy.contains("Last Updated").should("exist");
  });
});
