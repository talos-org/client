describe('accessing the app for the first time', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  it('redirects to `/welcome`', () => {
    cy.visit('/');
    cy.url().should('include', 'welcome');
  });
});

describe('accessing the app thereafter', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem('chainName', '__DEBUG__');
  });

  it('takes the user to the dashboard', () => {
    cy.visit('/');
  });

  it('can see the word “__DEBUG__” somewhere on the screen', () => {
    cy.contains('__DEBUG__');
  });
});
