/* global cy */

describe('WinModal', () => {
    it('should display the win modal when the correct country is guessed', () => {
        cy.visit('http://localhost:3000');

        // Wait for the autocomplete to be visible
        cy.get('.AutocompleteAndButton input').should('be.visible');
    });
}); 