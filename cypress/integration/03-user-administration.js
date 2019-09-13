describe('User Administration', function() {

    before(() => {
        cy.visit('http://localhost:8080/users');
    });

    it('View A User Log', function () {
        cy.wait(2000);
        cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().contains('View Logs');
        //cy.wait(2000);
        // cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().click();
    });

    it('Delete A User', function () {
        cy.wait(2000);
        cy.get('.white--text.v-btn.v-btn--depressed.theme--light.v-size--large.red').last().click();
        cy.wait(2000);
        cy.get('.v-btn.v-btn--contained.theme--light.v-size--large.primary').first().click();
    });

    // it('Delete A User Log', function () {
    //     cy.get(<span class="v-btn__content">Delete</span>);
    //     cy.get(<span className="v-btn__content">View Logs</span>);
    //     cy.get(<span className="v-btn__content">X</span>);
    // })
});

