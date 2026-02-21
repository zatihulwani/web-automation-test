import "./commands";
import '@4tw/cypress-drag-drop';


Cypress.on("uncaught:exception", (err, runnable) => {

  return true;
});


Cypress.on("fail", (error, runnable) => {

  throw error;
});


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