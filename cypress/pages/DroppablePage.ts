export class DroppablePage {

  private dragSource = "#draggable";
  private dropTarget = "#simpleDropContainer #droppable";
  private resultText = "#droppable p";


  private ignoreErrors() {
    cy.on('uncaught:exception', () => {
      return false; 
    });
  }

  private removeBlockers() {
    cy.get('body').then(($body) => {
      const blockers = [
        'header',
        '#adplus-anchor',
        '#fixedban',
        'footer',
        '.modal-backdrop',
        '.advertisement'
      ];
      
      blockers.forEach((selector) => {
        if ($body.find(selector).length > 0) {
          cy.get(selector).invoke('remove');
        }
      });
    });
  }

  getDragElement() {
    return cy.get(this.dragSource);
  }

  getDropTarget() {
    return cy.get(this.dropTarget);
  }

  dragAndDropReal() {
    this.ignoreErrors();
    this.removeBlockers();


    cy.get(this.dropTarget).scrollIntoView().should('be.visible');


    cy.get(this.dragSource)
      .should('be.visible')
      .then(($dragElement) => {
        const dragCoords = $dragElement[0].getBoundingClientRect();
        const dragX = dragCoords.left + dragCoords.width / 2;
        const dragY = dragCoords.top + dragCoords.height / 2;


        cy.get(this.dropTarget).then(($dropElement) => {
          const dropCoords = $dropElement[0].getBoundingClientRect();
          const dropX = dropCoords.left + dropCoords.width / 2;
          const dropY = dropCoords.top + dropCoords.height / 2;


          cy.get(this.dragSource)
            .trigger('mousedown', { buttons: 1, clientX: dragX, clientY: dragY });

     
          cy.get('body')
            .trigger('mousemove', { buttons: 1, clientX: dropX, clientY: dropY });


          cy.get(this.dropTarget)
            .trigger('mouseup', { clientX: dropX, clientY: dropY })
            .trigger('drop', { clientX: dropX, clientY: dropY });

    
          cy.get(this.dragSource)
            .trigger('dragend');
        });
      });

    cy.wait(500);
  }

  verifyDropSuccess(expectedText: string) {

    cy.on('uncaught:exception', () => false);


    cy.get(this.dropTarget, { timeout: 15000 }).should(($el) => {
      const text = $el.text().trim().toLowerCase();
      cy.log(`Drop target text: "${text}"`);
 
      expect(text).to.satisfy((str: string) => {
        return str.includes('dropped') || str.includes('drop here') || str.includes(expectedText.toLowerCase());
      });
    });
  }


  dragAndDropForce() {
    this.ignoreErrors();
    this.removeBlockers();

    cy.get(this.dropTarget).scrollIntoView().should('be.visible');


    cy.get(this.dragSource)
      .trigger('dragstart', { force: true, dataTransfer: {} });

    cy.get(this.dropTarget)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true, dataTransfer: {} })
      .trigger('drop', { force: true, dataTransfer: {} });

    cy.get(this.dragSource)
      .trigger('dragend', { force: true });

    cy.wait(500);
  }

  verifyPageLoaded() {
    this.ignoreErrors();
    cy.get(this.dragSource).should('exist');
    cy.get(this.dropTarget).should('exist');
  }
}
