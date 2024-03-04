describe("Add/Edit Member Functionality Test", () => {
  it("verifies Add Member functionality", () => {
    cy.visit("/");

    cy.addNewMember().then((generatedName) => {
      cy.validateCreateNewMemberSuccessNotification();
      cy.wait(2000);
      cy.verifyNewRecord(generatedName);
      cy.searchValidName(generatedName);
    });
  });

  it("verifies Edit Member functionality", () => {
    cy.visit("/");
    cy.editMember().then((data) => {
      cy.validateEditMemberNotification();
      cy.wait(2000);
      cy.verifyEditedMemberData(data.fullname, 1);
      cy.verifyEditedMemberData(data.salary.toLocaleString("en-US"), 5);
    });
  });
});
