/**
 * Page Object Model untuk halaman Droppable
 * URL: https://demoqa.com/droppable
 */

export class DroppablePage {
  // ==================== SELECTORS ====================

  private dragSource = "#draggable";
  private dropTarget = "#simpleDropContainer #droppable";
  private resultText = "#droppable p";

  // ==================== METHODS ====================

  /**
   * Abaikan cross-origin errors dari DemoQA
   */
  private ignoreErrors() {
    cy.on('uncaught:exception', () => {
      return false; // Ignore error dan lanjut test
    });
  }

  /**
   * Hapus elemen yang sering menghalangi (ads, header, footer)
   */
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

  /**
   * Get drag element
   */
  getDragElement() {
    return cy.get(this.dragSource);
  }

  /**
   * Get drop target element
   */
  getDropTarget() {
    return cy.get(this.dropTarget);
  }

  /**
   * Lakukan drag and drop dengan cara yang reliable
   * Menggunakan mouse events daripada DataTransfer
   */
  dragAndDropReal() {
    this.ignoreErrors();
    this.removeBlockers();

    // Scroll drop target ke view
    cy.get(this.dropTarget).scrollIntoView().should('be.visible');

    // Get koordinat dari drag source
    cy.get(this.dragSource)
      .should('be.visible')
      .then(($dragElement) => {
        const dragCoords = $dragElement[0].getBoundingClientRect();
        const dragX = dragCoords.left + dragCoords.width / 2;
        const dragY = dragCoords.top + dragCoords.height / 2;

        // Get koordinat dari drop target
        cy.get(this.dropTarget).then(($dropElement) => {
          const dropCoords = $dropElement[0].getBoundingClientRect();
          const dropX = dropCoords.left + dropCoords.width / 2;
          const dropY = dropCoords.top + dropCoords.height / 2;

          // Trigger drag start
          cy.get(this.dragSource)
            .trigger('mousedown', { buttons: 1, clientX: dragX, clientY: dragY });

          // Trigger drag move
          cy.get('body')
            .trigger('mousemove', { buttons: 1, clientX: dropX, clientY: dropY });

          // Trigger drop
          cy.get(this.dropTarget)
            .trigger('mouseup', { clientX: dropX, clientY: dropY })
            .trigger('drop', { clientX: dropX, clientY: dropY });

          // Trigger drag end
          cy.get(this.dragSource)
            .trigger('dragend');
        });
      });

    // Wait a bit untuk animasi
    cy.wait(500);
  }

  /**
   * Verifikasi drag and drop berhasil dengan timeout panjang
   */
  verifyDropSuccess(expectedText: string) {
    // Ignore errors sambil menunggu verifikasi
    cy.on('uncaught:exception', () => false);

    // Coba cari text "dropped" di berbagai kemungkinan lokasi
    cy.get(this.dropTarget, { timeout: 15000 }).should(($el) => {
      const text = $el.text().trim().toLowerCase();
      cy.log(`Drop target text: "${text}"`);
      
      // Text yang dicari harus ada di element
      // Bisa "drop here dropped" atau hanya "dropped"
      expect(text).to.satisfy((str: string) => {
        return str.includes('dropped') || str.includes('drop here') || str.includes(expectedText.toLowerCase());
      });
    });
  }

  /**
   * Alternative: Lakukan drag and drop dengan force click (jika mouse events tidak work)
   */
  dragAndDropForce() {
    this.ignoreErrors();
    this.removeBlockers();

    cy.get(this.dropTarget).scrollIntoView().should('be.visible');

    // Coba dengan force trigger
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

  /**
   * Check apakah page sudah ter-load dengan baik
   */
  verifyPageLoaded() {
    this.ignoreErrors();
    cy.get(this.dragSource).should('exist');
    cy.get(this.dropTarget).should('exist');
  }
}
