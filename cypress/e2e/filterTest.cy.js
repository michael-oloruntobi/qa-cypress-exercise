describe("Filter Functionality Test", () => {
  const employeeTypes = ["Contractor", "Employee"];

  beforeEach(() => {
    cy.visit("/");
  });

  employeeTypes.forEach((employeeType) => {
    it(`validates filter for ${employeeType}`, () => {
      cy.filterEmployeeType(employeeType);
    });
  });
});
