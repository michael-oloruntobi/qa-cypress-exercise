// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import faker library for generating random data
import { faker } from "@faker-js/faker";

// Custom Cypress command to search for a person by name
Cypress.Commands.add("searchValidName", (input) => {
  // Clear the search input field
  cy.get("#search-person").clear();

  // Type the search term
  cy.get("#search-person").type(input);

  // Wait for a short duration for search results to update (adjust as needed)
  cy.wait(1000);

  // Find the tbody element containing search results
  cy.get("tbody")
    // Find all rows (tr elements) within the tbody
    .children("tr")
    // Loop through each row
    .each(($row) => {
      // Wrap the current row element for Cypress operations
      cy.wrap($row)
        // Find the first table cell (td) within the row
        .find("td:first-child")
        // Assert that the first cell's text content contains the search term
        .should("contain", input);
    });
});

// Custom Cypress command to filter members by employee type
Cypress.Commands.add("filterEmployeeType", (input) => {
  // Convert the input to lowercase for case-insensitive matching
  const lowercaseInput = input.toLowerCase();

  // Use the lowercased input to construct the filter button selector
  cy.getByTestId(`${lowercaseInput}-filter`).click();

  // Wait for a short duration for filter results to update (adjust as needed)
  cy.wait(1000);

  // Find the tbody element containing filtered results
  cy.get("tbody")
    // Find all rows (tr elements) within the tbody
    .children("tr")
    // Loop through each row
    .each(($row) => {
      // Wrap the current row element for Cypress operations
      cy.wrap($row)
        // Find the third table cell (td) within the row (assuming employee type is in the third column)
        .find("td:nth-child(3)")
        // Assert that the third cell's text content contains the filter input (original case)
        .should("contain", input);
    });
});

// Custom Cypress command to add a new member
Cypress.Commands.add("addNewMember", () => {
  // Generate random data for member creation
  const fullname = faker.person.fullName();
  const jobTitle = faker.person.jobTitle();
  const salary = Math.floor(Math.random() * 200000); // Generate random salary less than 200,000

  // Chain Cypress commands to create a new member
  return cy
    .get("#create-person")
    .click() // Click the "Create Person" button
    .get("#name")
    .type(fullname) // Enter the generated full name
    .get("#jobTitle")
    .type(jobTitle) // Enter the generated job title
    .getByTest_Id("country-input")
    .select("France") // Select country (assuming "France" is an option)
    .getByTest_Id("currency-input")
    .select("USD") // Select currency (assuming "USD" is an option)
    .get("#salary-input")
    .type(salary) // Enter the generated salary
    .getByTest_Id("employment-input")
    .select("employee") // Select employment type (assuming "employee" is an option)
    .getByTestId("modal-save-button")
    .click() // Click the "Save" button in the modal
    .then(() => fullname); // Resolve the promise with the generated fullname after all commands finish
});

// Custom Cypress command to validate the "Create New Member" success notification
Cypress.Commands.add("validateCreateNewMemberSuccessNotification", () => {
  // Assert that the status element contains the success message
  cy.get("[role='status']").should(
    "contain",
    "You’ve successfully added a member."
  );
});

// Custom Cypress command to validate the "Edit Member" success notification (similar to above)
Cypress.Commands.add("validateEditMemberNotification", () => {
  cy.get("[role='status']").should(
    "contain",
    "You’ve successfully edited a member."
  );
});

// Custom Cypress command to verify a new record exists with the provided full name
Cypress.Commands.add("verifyNewRecord", (fullname) => {
  // Find the tbody element containing the table data
  cy.get("tbody")
    // Find the last row (tr element) within the tbody (assuming new member is added at the end)
    .find("tr")
    .last()
    // Find the first table cell (td) within the last row (assuming name is in the first column)
    .find("td")
    .first()
    // Wrap the first cell element for Cypress operations
    .then(($row) => {
      cy.wrap($row)
        // Assert that the first cell's text content contains the expected full name
        .should("contain", fullname);
    });
});

// Custom Cypress command to find an element using a data-testid attribute with wildcard matching
Cypress.Commands.add("getByTestId", (selector, ...args) => {
  // Construct the selector using the provided data-testid with wildcard matching
  return cy.get(`[data-testid*=${selector}]`, ...args);
});

// Similar custom command using data-test-id attribute (assuming it's another way to identify elements)
Cypress.Commands.add("getByTest_Id", (selector, ...args) => {
  return cy.get(`[data-test-id*=${selector}]`, ...args);
});

// Custom Cypress command to edit a member
Cypress.Commands.add("editMember", () => {
  // Generate random data for member editing
  const fullname = faker.person.fullName();
  const salary = Math.floor(Math.random() * 200000);

  // Chain Cypress commands to edit a member
  return cy
    .getByTestId("edit-person")
    .eq(0) // Select the first "Edit Person" button (assuming there can be multiple)
    .click()
    .get("#name")
    .clear() // Clear the existing name field
    .type(fullname) // Enter the generated new full name
    .get("#salary-input")
    .clear() // Clear the existing salary field
    .type(salary) // Enter the generated new salary
    .get("[data-testid='modal-save-button']")
    .click() // Click the "Save" button in the modal
    .then(() => ({ fullname, salary })); // Resolve the promise with an object containing both edited values
});

// Custom Cypress command to verify a specific value exists in a particular table cell (column) index
Cypress.Commands.add("verifyEditedMemberData", (value, columnIndex) => {
  // Find the tbody element containing the table data
  cy.get("tbody")
    // Find the first row (tr element) within the tbody (assuming edited member is updated in the first row)
    .find("tr")
    .first()
    // Find the table cell (td) at the specified column index within the first row
    .find(`td:nth-child(${columnIndex})`)
    // Wrap the cell element for Cypress operations
    .then(($td) => {
      cy.wrap($td)
        // Assert that the cell's text content contains the expected value
        .should("contain.text", value);
    });
});
