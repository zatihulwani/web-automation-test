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

  // ================= LOAD CSV =================
  before(() => {
    cy.readFile("cypress/fixtures/users.csv").then((csvFile) => {

      const result = Papa.parse<UserData>(csvFile, {
        header: true,
        skipEmptyLines: true,
      });

      csvData = result.data;
    });
  });

  // ================= OPEN PAGE =================
  beforeEach(() => {
    cy.visit("/", { failOnStatusCode: false }); 
    cy.contains("Elements").click(); 
    cy.contains("Web Tables").click();

    // remove ads iframe
    cy.window().then((win) => {
      const ads = win.document.querySelectorAll("iframe");
      ads.forEach((el) => el.remove());
    });
  });

  // ================= POSITIVE =================
  describe("Positive Test Cases", () => {

    it("Register multiple users from CSV", () => {

      cy.wrap(csvData).each((user: UserData) => {

        page.clickAddButton();

        cy.get("#firstName").should("be.visible");

        page.fillForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          salary: user.salary,
          department: user.department,
        });

        page.submitForm();

        cy.get('[role="dialog"]').should("not.exist");
        cy.wait(800);
      
        // remove ads lagi (demoqa sering inject ulang)
        cy.window().then((win) => {
          const ads = win.document.querySelectorAll("iframe");
          ads.forEach((el) => el.remove());
        });

        // verify user
        page.verifyUserWithPagination(
          user.firstName,
          user.lastName,
          user.email
        );

      });

    });

  });


});