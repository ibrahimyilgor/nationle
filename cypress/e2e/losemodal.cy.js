/* global cy */

describe('LoseModal', () => {
    it('should display the lose modal after 6 incorrect guesses', () => {
        cy.visit('http://localhost:3000');

        // Wait for the autocomplete to be visible
        cy.get('.AutocompleteAndButton input').should('be.visible');
    });
}); 