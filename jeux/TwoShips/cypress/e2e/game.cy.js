describe('Tests fonctionnels du jeu', () => {
  it('Game should be playable', () => {
    cy.visit('/');
    cy.title().should('eq', 'js13k-2021');
  });
  it('Game should have a canvas', () => {
    cy.visit('/');
    cy.get('#canvas').should('be.visible');
  });
  it('Game should have a title', () => {
    cy.visit('/');
    cy.get('h1').should('contain.text', 'Two');
  });
});
it('TEST TEMPORAIRE - doit échouer', () => {
  cy.visit('/');
  cy.get('#element-qui-nexiste-pas').should('be.visible');
});
