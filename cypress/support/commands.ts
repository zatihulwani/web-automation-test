/**
 * Custom Cypress Commands
 */

// Custom command untuk log
Cypress.Commands.add("logInfo", (message: string) => {
  cy.log(`ℹ️ ${message}`);
});

Cypress.Commands.add("logSuccess", (message: string) => {
  cy.log(`✅ ${message}`);
});

Cypress.Commands.add("logError", (message: string) => {
  cy.log(`❌ ${message}`);
});

Cypress.Commands.add("logWarn", (message: string) => {
  cy.log(`⚠️ ${message}`);
});

// Custom command untuk wait dan verify element
Cypress.Commands.add("waitAndVerify", (selector: string) => {
  cy.get(selector, { timeout: 5000 }).should("be.visible");
});

// Custom command untuk fill input dengan clear
Cypress.Commands.add("fillInput", (selector: string, value: string) => {
  cy.get(selector).clear().type(value);
});

// Declare custom commands untuk TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      logInfo(message: string): Chainable<void>;
      logSuccess(message: string): Chainable<void>;
      logError(message: string): Chainable<void>;
      logWarn(message: string): Chainable<void>;
      waitAndVerify(selector: string): Chainable<JQuery<HTMLElement>>;
      fillInput(selector: string, value: string): Chainable<void>;
    }
  }
}
