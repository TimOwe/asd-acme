describe('Qui Administration', function() {

    before(() => {
        cy.visit('http://localhost:8080/login')
    })
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('user')
    })
    it('Login', function () {
        cy.get('[name="logemail"]').type('tim@tim.com');
        cy.get('[name="logpass"]').type('password');
        cy.get('button').contains('Log-In').click();
        cy.wait(2000);
        cy.url().should('eq', 'http://localhost:8080/');;
    });

    it('Open Quiz Creator Page', function() {
        cy.visit('http://localhost:8080/quizcatalogue')
        cy.get('.v-btn').contains('Create Quiz').click();
    })

    it('Enters Quiz Information', function() {
        cy.get('[name="quiztitle"]').type('This is a new test quiz for feature 04');
        cy.get('[name="quizdescription"]').type('test test test test');
        cy.get('[name="quizimage"]').click({force: true})
        cy.get('[role="listbox"]').contains('Light').click()
        cy.get('[name="quizcategory"]').click({force: true})
        cy.get('[role="listbox"]').contains('General Knowledge').click()
        cy.wait(500)
    })

    it('Enters a question', function() {
        cy.get('[name="q0questionname"]').type('Test question 1')
        cy.get('[name="q0questionscore"]').type(1000);
        cy.get('[name="q0Answer #1"]').type('Test Answer 1')
        cy.get('[name="q0Answer #2"]').type('Test Answer 2')
        cy.get('[name="q0Answer #3"]').type('Test Answer 3')
        cy.get('[name="q0Answer #4"]').type('Test Answer 4')
        cy.get('[type="radio"]')
        cy.get('[name="q0checkAnswer #2"]').check({force:true})
    })
    it('Publishes Quiz', function() {
        cy.get('.v-btn').contains('Publish Quiz').click();
        cy.wait(500)
        cy.get('.v-dialog').contains('Confirm Quiz Publish')
        cy.get('.v-btn').contains('Publish').click();
        cy.wait(500)
        cy.get('.v-dialog').contains('Success!')
    });

it('View A Quiz Log', function () {
        cy.visit('http://localhost:8080/quizs');
        cy.wait(2000);
        cy.get('.container').contains('This is a new test quiz for feature 04').parent().contains('View Logs').click();
    });
    it('Delete A Quiz', function () {
        cy.wait(2000);
        cy.get('.container').contains('This is a new test quiz for feature 04').parent().contains('Delete').click({force:true});
        cy.get('container').should('not.have.value','This is a new test quiz for feature 04')
    });
});

