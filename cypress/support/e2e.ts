// ========================================
// Cypress Support File
// ========================================

import "./commands";
import '@4tw/cypress-drag-drop';

// Disable uncaught exception handling untuk error tertentu
Cypress.on("uncaught:exception", (err, runnable) => {
  // Return false untuk ignore error tertentu
  // Return true untuk fail test
  return true;
});

// Custom error handling
Cypress.on("fail", (error, runnable) => {
  // Bisa tambahkan custom logic di sini
  throw error;
});

// Suppress console errors (opsional)
const app = window.top;

if (!app?.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app?.document.createElement("style");
  style!.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
  style?.setAttribute("data-hide-command-log-request", "");
  app?.document.head.appendChild(style!);
}
Cypress.on("uncaught:exception", () => false);
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});