
describe('Register', function () {
    before(() => {
        cy.visit('http://localhost:8080/')
    });

    it('Go To Home And Navigate To Host', function () {
        cy.get('.v-btn').contains('Host Game').click();
        cy.wait(2000);
        cy.url().should('eq', 'http://localhost:8080/host');

    });

    it('Enter Meta Data For Session', function () {
        cy.get('.v-select__selections').click();
        cy.wait(1000);
        cy.get('#ancient-history-list-item-54').click();
        cy.get('input').eq(1).type(20);
        cy.get('input').last().type(100);
        // cy.get('[name="logpass"]').type('passpasspasspass');
        // cy.get('button').contains('Log-In').click();
    });

    it('Start Game And Get Token', function () {
        cy.wait(2000);
        cy.get('.primary').click();
        cy.wait(2000);
        cy.get('.v-card__title').contains('Share this code!').click();
        cy.wait(2000);
    });

    it('Navigates to host page', function () {
        cy.get('.v-btn.v-btn--absolute.v-btn--bottom.v-btn--contained.v-btn--fab.v-btn--right.v-btn--round.theme--light.v-size--default').click();
        cy.wait(2000);
        cy.get('.v-btn.red').contains('End Game')
    })

});
