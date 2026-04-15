describe('Tests fonctionnels du jeu', () => {
  it('Game should be playable', () => {
    cy.visit('http://localhost:3000/index.html');
    cy.title().should('eq', 'js13k-2021');
  });
  it('Game should have a canvas', () => {
    cy.visit('http://localhost:3000/index.html');
    cy.get('#canvas').should('be.visible');
  });
  it('Game should have a title', () => {
    cy.visit('http://localhost:3000/index.html');
    cy.get('h1').should('contain.text', 'Two');
  });
});
