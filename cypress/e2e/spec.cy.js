
// Cypress End-to-End Test for Weather Dashboard App

describe('🌤 Weather Dashboard E2E Test', () => {
  // This hook runs before each test
  beforeEach(() => {
    // Visit the local app URL before each test
    cy.visit('http://localhost:3000');
  });

  it('Loads the app and shows header and form', () => {
    // Check if the app title is visible
    cy.contains('🌤 Weather Dashboard');
    // Check if the input field for city name exists
    cy.get('input[placeholder="Enter city name"]').should('exist');
    // Check if the search button exists
    cy.get('button[type="submit"]').should('contain', 'Search');
  });

  it('Searches for a specific city and displays weather data card with city name', () => {
    const testCity = 'Renton'; // Specific test city

    // Type the test city into the input field
    cy.get('input[placeholder="Enter city name"]').type(testCity);
    // Submit the form
    cy.get('form').submit();

    // Wait for the loading indicator
    cy.contains('Loading...');

    // Check if the city name with the 🏛️ symbol appears
    cy.contains(`🏛️ ${testCity}`).should('exist');

    // Check for weather data sections
    cy.contains('🌡 Temperature').should('exist');
    cy.contains('📅 Hourly Forecast').should('exist');
  });

  it('Removes a city from the display', () => {
    const testCity = 'Renton';

    // Add a test city
    cy.get('input[placeholder="Enter city name"]').type(testCity);
    cy.get('form').submit();

    // Ensure the city card appears
    cy.contains(`🏛️ ${testCity}`).should('exist');

    // Click on the remove button
    cy.contains('Remove').click();

    // Ensure the city card is removed
    cy.contains(`🏛️ ${testCity}`).should('not.exist');
  });
});