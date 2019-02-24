describe('/welcome', () => {
  it('can visit `/welcome`', () => {
    cy.visit('/welcome');
  });

  it('can find both buttons', () => {
    cy.get('button');
  });

  // FIXME: Don’t skip once `/wizard/existing` no longer redirects
  it.skip('can click “Create existing blockchain“ button', () => {
    cy.get('button')
      .contains('existing')
      .as('existingBlockchainBtn');

    cy.get('@existingBlockchainBtn').click({ force: true });

    cy.url().should('include', 'existing');
  });

  it('can click “Create new blockchain“ button', () => {
    cy.get('button')
      .contains('new')
      .as('newBlockchainBtn');

    cy.get('@newBlockchainBtn').click({ force: true });

    cy.url().should('include', 'new');
  });
});
