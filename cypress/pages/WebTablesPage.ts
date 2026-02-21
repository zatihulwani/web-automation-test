/**
 * Page Object Model untuk halaman Web Tables
 * URL: https://demoqa.com/webtables
 */

export class WebTablesPage {
  // ==================== SELECTORS ====================

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
 

  // ==================== METHODS ====================

  /**
   * Click tombol Add untuk membuka form registrasi
   */
  clickAddButton() {
    cy.contains("button", "Add").click();
  }

  /**
   * Isi form registrasi dengan data user
   */
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
  

  /**
   * Submit form registrasi
   */
  submitForm() {
    cy.get(this.submitButton).click();
  }

// ================= VALIDATION =================

  // waitForModalClose() {
  //   cy.get(this.modalDialog).should("not.exist");
  // }
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

// verifyUserInTable(firstName: string, lastName: string, email: string) {

//   cy.get("body").then(($body) => {

//     cy.contains(firstName, { timeout: 10000 }).should("exist");
//     cy.contains(lastName).should("exist");
//     cy.contains(email).should("exist");

//   });

// }
verifyUserWithPagination(firstName: string, lastName: string, email: string) {

  cy.get("body").then(($body) => {

    // cek apakah user ada di page sekarang
    if ($body.text().includes(firstName)) {

      cy.contains(firstName).should("exist");
      cy.contains(lastName).should("exist");
      cy.contains(email).should("exist");

    } else {

      // klik next page jika ada
      cy.get(this.nextButton).then(($next) => {

        // jika tombol next disabled → user tidak ada
        if ($next.is(":disabled")) {
          throw new Error("User not found in any page");
        }

        // klik next
        cy.wrap($next).click();

        cy.wait(500);

        // cek ulang (recursion)
        this.verifyUserWithPagination(firstName, lastName, email);

      });

    }

  });

}
      





  /**
   * Close modal dialog
   */
  closeModal() {
    cy.get(this.closeButton).click();
  }

  
  /**
   * Cek apakah error message muncul
   */
  hasValidationError(fieldName: string) {
    return cy.contains(fieldName).parent().find(".invalid-feedback");
  }

  /**
   * Cek jumlah row di table
   */
  getTableRowCount() {
    return cy.get(this.tableRows).its("length");
  }

  /**
   * Search user di table
   */
  searchUser(keyword: string) {
    cy.get('input[placeholder="Type to search"]').type(keyword);
  }
}
