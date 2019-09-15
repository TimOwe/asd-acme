describe('User Administration', function() {

    before(() => {
        cy.visit('http://localhost:8080/users');
    });

    it('Delete A User', function () {
        cy.wait(2000);
        cy.get('.white--text.v-btn.v-btn--depressed.theme--light.v-size--large.red').last().click();
        cy.wait(2000);
        cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().click();
    });

    it('View A User Log', function () {
        cy.wait(2000);
        cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().contains('View Logs');
        //cy.wait(2000);
        // cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().click();
    });

    it('Delete A User Log', function () {
         cy.wait(2000);
         cy.get('button span.v-btn__content').first().click();
     })
});

