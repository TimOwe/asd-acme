
describe('Register', function () {
    before(() => {
        cy.visit('http://localhost:8080/login')
    })
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('user')
    })
    it('Create User', function () {
        cy.get('button').contains('Register').click();
        cy.get('[name="fname"]').type('dandandandan');
        cy.get('[name="lname"]').type('harthartharthart');
        cy.get('[name="email"]').type('dan@asdf.com');
        cy.get('[name="pass"]').type('passpasspasspass');
        cy.get('.v-select').click();
        cy.wait(2000);
        cy.get('.v-select-list').click();
        cy.get('button').contains('Save').click();
        cy.wait(2000);
        cy.get('button').contains('Close').click();
    })
    it('Login', function () {
        cy.get('[name="logemail"]').type('dan@asdf.com');
        cy.get('[name="logpass"]').type('passpasspasspass');
        cy.get('button').contains('Log-In').click();
        cy.wait(2000);
        cy.url().should('eq', 'http://localhost:8080/');;
    })
    it('Delete user', function () {
        cy.wait(2000);
        cy.get(':nth-child(7) > .v-btn--fab > .v-btn__content > .v-icon').click();
        cy.wait(2000);
        cy.get('button').contains('Delete Account').click();
        cy.wait(2000);
        cy.url().should('eq', 'http://localhost:8080/');
    })

})
