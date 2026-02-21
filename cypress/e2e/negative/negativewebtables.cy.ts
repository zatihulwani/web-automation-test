import { WebTablesPage } from "../../pages/WebTablesPage";
import Papa from "papaparse";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

describe("Web Tables Registration Test", () => {

  const page = new WebTablesPage();
  let csvData: UserData[] = [];

 
  before(() => {
    cy.readFile("cypress/fixtures/users.csv").then((csvFile) => {

      const result = Papa.parse<UserData>(csvFile, {
        header: true,
        skipEmptyLines: true,
      });

      csvData = result.data;
    });
  });

  beforeEach(() => {
    cy.visit("/", { failOnStatusCode: false }); 
    cy.contains("Elements").click(); 
    cy.contains("Web Tables").click();

    cy.window().then((win) => {
      const ads = win.document.querySelectorAll("iframe");
      ads.forEach((el) => el.remove());
    });
  });


  describe("Negative Test Cases", () => {

    it("Email empty", () => {

      page.clickAddButton();
      cy.get("#firstName").should("be.visible");

      page.fillForm({
        firstName: "Test",
        lastName: "User",
        age: "25",
        salary: "5000000",
        department: "IT"
      });

      page.submitForm();

  
    cy.get('[role="dialog"]').should("be.visible");

      cy.get("#userEmail").should("have.value", "");

    });

it("Age invalid", () => {
  page.clickAddButton();
  cy.get("#firstName").should("be.visible");

  cy.get("#firstName").type("Test");
  cy.get("#lastName").type("User");
  cy.get("#userEmail").type("test@test.com");
  cy.get("#age").type("abc");

  page.submitForm();


  cy.get("#age").clear().should("have.value", "");
});

});

});