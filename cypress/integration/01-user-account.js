describe('Register', function () {
    before(() => {
        cy.visit('http://localhost:8080/login')
    })
    it('Create User', function () {
        cy.get('button').contains('Register').click();
        cy.get('[name="fname"]').type('dandandandan');
        cy.get('[name="lname"]').type('harthartharthart');
        cy.get('[name="email"]').type('dan@asdf.com');
        cy.get('[name="pass"]').type('passpasspasspass');
        cy.get('.v-select').click()
        cy.get('.v-select-list').click();
        cy.get('button').contains('Save').click();
        cy.get('button').contains('Close').click();
    })
    it('Login', function () {
        cy.get('[name="logemail"]').type('dan@asdf.com');
        cy.get('[name="logpass"]').type('passpasspasspass');
        cy.get('button').contains('Log-In').click();
    })
    it('Delete user', function () {
        cy.wait(5000);
        cy.get('[name="settings"]').click();
        cy.wait(5000);
        cy.get('button').contains('Delete Account').click();
        cy.url().should('eq', 'http://localhost:8080/')
    })

})
