describe('User Administration', function() {

    before(() => {
        cy.visit('http://localhost:8080/login');
    });
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('user')
    })
    it('Create User', function () {
        cy.get('button').contains('Register').click();
        cy.get('[name="fname"]').type('mattmattmattmatt');
        cy.get('[name="lname"]').type('zylzylzylzyl');
        cy.get('[name="email"]').type('matt@zyl.com');
        cy.get('[name="pass"]').type('password');
        cy.get('.v-select').click();
        cy.wait(2000);
        cy.get('.v-select-list').click();
        cy.get('button').contains('Save').click();
        cy.wait(2000);
        cy.get('button').contains('Close').click();
    });
    it('Login', function () {
        cy.get('[name="logemail"]').type('matt@zyl.com');
        cy.get('[name="logpass"]').type('password');
        cy.get('button').contains('Log-In').click();
        cy.wait(2000);
        cy.url().should('eq', 'http://localhost:8080/');;
    });
    it('View A User Log', function () {
        cy.visit('http://localhost:8080/users');
        cy.wait(2000);
        cy.get('.container').contains('Mattmattmattmatt Zylzylzylzyl').parent().contains('View Logs').click();
    });
    it('Delete A User Log', function () {
        cy.wait(2000);
        cy.get('button span.v-btn__content').first().click();
     });
    it('Delete A User', function () {
        cy.wait(2000);
        cy.get('.container').contains('Mattmattmattmatt Zylzylzylzyl').parent().contains('Delete').click({force:true});
        cy.get('container').should('not.have.value','Mattmattmattmatt Zylzylzylzyl')
    });


});

