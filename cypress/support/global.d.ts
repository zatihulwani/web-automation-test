/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    drag(
      target: string,
      options?: Partial<{ force: boolean; position: "topLeft" | "top" | "topRight" | "left" | "center" | "right" | "bottomLeft" | "bottom" | "bottomRight" }>
    ): Chainable<Subject>;
  }
};

declare namespace Cypress {
  interface Chainable<Subject> {
    realMouseDown(): Chainable<Subject>;
    realMouseUp(): Chainable<Subject>;
    realMouseMove(options?: {
      x?: number;
      y?: number;
      position?: "topLeft" | "top" | "topRight" | "left" | "center" | "right" | "bottomLeft" | "bottom" | "bottomRight";
    }): Chainable<Subject>;
  }
}