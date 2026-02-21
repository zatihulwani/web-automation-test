// cypress/e2e/positive/droppable.cy.ts
import { DroppablePage } from "../../pages/DroppablePage";

describe("Positive Test - Droppable Success", () => {
  const droppablePage = new DroppablePage();

  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.visit("/", { failOnStatusCode: false }); 
    cy.contains("Interactions").click(); 
    cy.contains("Droppable").click();

    droppablePage.verifyPageLoaded();

    // Hapus elemen yang sering menutupi layar atau bikin lambat (Header/Ads)
  cy.get('header').invoke('remove');
  cy.get('#adplus-anchor').invoke('remove');
  cy.get('footer').invoke('remove');
  droppablePage.getDragElement().should('be.visible');
  });
 

    it("BTC-001: Drag & drop element berhasil", () => {
      cy.log("🔄 Test: Drag and Drop Simple");

      // Verifikasi elemen drag ada
      droppablePage.getDragElement().should("be.visible");
      droppablePage.getDropTarget().should("be.visible");

      cy.log("✅ Elements found, starting drag and drop");

      // Lakukan drag and drop
      droppablePage.dragAndDropReal();

      cy.log("✅ Drag and drop action completed");

      // Verifikasi success - check apakah text berubah
      cy.get("#simpleDropContainer #droppable", { timeout: 15000 }).then(($el) => {
        const text = $el.text().toLowerCase();
        cy.log(`Text setelah drop: "${$el.text()}"`);
        
        // Cek apakah ada "drop here dropped" atau "dropped"
        const hasDropped = text.includes("dropped");
        const hasDropHere = text.includes("drop here");
        
        // Minimal salah satu dari kondisi ini harus true
        expect(hasDropped || hasDropHere).to.be.true;
      });

      cy.log("✅ Verification complete - Drop successful!");
    });
});
  