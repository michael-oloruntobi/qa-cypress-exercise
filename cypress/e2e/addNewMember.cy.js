describe("Add/Edit Member Functionality Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verifies Add Member functionality", () => {
    cy.addNewMember().then((generatedName) => {
      cy.validateCreateNewMemberSuccessNotification();
      cy.wait(2000);
      cy.verifyNewRecord(generatedName);
      cy.searchValidName(generatedName);
    });
  });

  it("verifies Edit Member functionality", () => {
    cy.editMember().then((data) => {
      cy.validateEditMemberNotification();
      cy.wait(2000);
      cy.verifyEditedMemberData(data.fullname, 1);
      cy.verifyEditedMemberData(data.salary.toLocaleString("en-US"), 5);
    });
  });
});
