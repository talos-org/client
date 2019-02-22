describe('/', () => {
  it('redirects to `/welcome`', () => {
    // TODO: Inject `chainName` from local storage
    // here and rewrite this test
    cy.visit('/');
    cy.url().should('include', 'welcome');
  });
});
