
export class WebTablesPage {

  private addButton = "button:contains('Add')";
  private firstNameInput = "#firstName";
  private lastNameInput = "#lastName";
  private emailInput = "#userEmail";
  private ageInput = "#age";
  private salaryInput = "#salary";
  private departmentInput = "#department";
  private submitButton = "#submit";
  private tableRows = ".rt-tbody .rt-tr:not(.rt-tr-group-header)";
  private modalDialog = "[role='dialog']";
  private closeButton = "#closeSmall";
  private table = ".rt-table";
  private searchBox = "#searchBox";
  private nextButton = 'button:contains("Next")';
 

  clickAddButton() {
    cy.contains("button", "Add").click();
  }

  fillForm(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    salary?: string;
    department?: string;
  }) {

  if (data.firstName)
    cy.get(this.firstNameInput).clear().type(data.firstName);

  if (data.lastName)
    cy.get(this.lastNameInput).clear().type(data.lastName);

  if (data.email)
    cy.get(this.emailInput).clear().type(data.email);

  if (data.age)
    cy.get(this.ageInput).clear().type(data.age);

  if (data.salary)
    cy.get(this.salaryInput).clear().type(data.salary);

  if (data.department)
    cy.get(this.departmentInput).clear().type(data.department);
}
  

  submitForm() {
    cy.get(this.submitButton).click();
  }

  waitForModalClose() {
  cy.get("body").then(($body) => {
    if ($body.find("[role='dialog']").length > 0) {
      cy.get("[role='dialog']").should("not.exist");
    }
  });
}

  waitForModalOpen() {
    cy.get(this.modalDialog).should("be.visible");
  }

verifyUserWithPagination(firstName: string, lastName: string, email: string) {

  cy.get("body").then(($body) => {

  
    if ($body.text().includes(firstName)) {

      cy.contains(firstName).should("exist");
      cy.contains(lastName).should("exist");
      cy.contains(email).should("exist");

    } else {


      cy.get(this.nextButton).then(($next) => {


        if ($next.is(":disabled")) {
          throw new Error("User not found in any page");
        }


        cy.wrap($next).click();

        cy.wait(500);


        this.verifyUserWithPagination(firstName, lastName, email);

      });

    }

  });

}
      


  closeModal() {
    cy.get(this.closeButton).click();
  }


  hasValidationError(fieldName: string) {
    return cy.contains(fieldName).parent().find(".invalid-feedback");
  }

  getTableRowCount() {
    return cy.get(this.tableRows).its("length");
  }

  searchUser(keyword: string) {
    cy.get('input[placeholder="Type to search"]').type(keyword);
  }
}
