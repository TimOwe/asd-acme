
describe('Register', function () {
    before(() => {
        cy.visit('http://localhost:8080/join')
    });

    it('Go To Join', function () {
        cy.visit('http://localhost:8080/join');
    });

    it('Enter Wrong Token To Be Validated', function () {
        cy.wait(1000);
        cy.get('input').first().type('XXXXXXX');
        cy.get('button').click();
        cy.wait(2500);
        cy.url().should('eq','http://localhost:8080/join')
    });

    it('Enter Token For Session', function () {
        cy.get('input').clear();
        cy.wait(1000);
        cy.get('input').first().type('d5nm4i');
        cy.get('button').click();
        cy.wait(1500);
        cy.get('.primary').contains('Join Game')
    });

});
