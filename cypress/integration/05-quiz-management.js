describe('Editing a Quiz', function() {
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

  it('Open Quiz Page', function() {
    cy.visit('http://localhost:8080/quizcatalogue')
    cy.get('[name="-Lr7-rjYP0UqTzakI0hOviewQuizBtn"]').click({force: true})
  })

  it('Open Editor Page', function() {
    cy.get('[name="editBtn"]').click({force: true})
  })

  it('Edit Quiz Information', function() {
    cy.get('[name="quizdescription"]').clear()
    cy.get('[name="quizdescription"]').type('For an acceptance test for feature 05!');
    cy.get('[name="quizimage"]').click({force: true})
    cy.get('[role="listbox"]').contains('Dark').click()
    cy.wait(500)
  })

  it('Publishes Quiz', function() {
    cy.get('.v-btn').contains('Update Quiz').click();
    cy.wait(500)
    cy.get('.v-dialog').contains('Confirm Quiz Update')
    cy.get('.v-btn').contains('Update').click();
    cy.wait(500)
    cy.get('.v-dialog').contains('Success!')
    cy.get('.v-btn').contains('Go to Quiz').click();})
})
