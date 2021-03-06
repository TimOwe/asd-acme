describe('Creating a Quiz with Advanced Features', function() {
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
    cy.get('[name="quiztitle"]').type('This is a new test quiz with advanced details!');
    cy.get('[name="quizdescription"]').type('For an acceptance test for feature 06!');
    cy.get('[name="quizimage"]').click({force: true})
    cy.get('[role="listbox"]').contains('Light').click()
    cy.get('[name="quizcategory"]').click({force: true})
    cy.get('[role="listbox"]').contains('General Knowledge').click()
    cy.wait(500)
  })

  it('Enters Advanced Quiz Details', function() {
    cy.get('[name="medbutton"]').click()
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

  it('Adds a second question', function() {
    cy.get('[name="addQuestion"]').click()
    cy.get('[name="q1questionname"]').type('Test question 2')
    cy.get('[name="q1questionscore"]').type(5000);
    cy.get('[name="q1Answer #1"]').type('Test Answer 5')
    cy.get('[name="q1Answer #2"]').type('Test Answer 6')
    cy.get('[name="q1Answer #3"]').type('Test Answer 7')
    cy.get('[name="q1Answer #4"]').type('Test Answer 8')
    cy.get('[type="radio"]')
    cy.get('[name="q1checkAnswer #3"]').check({force:true})
  })

  it('Adds a third question', function() {
    cy.get('[name="addQuestion"]').click()
    cy.get('[name="q2questionname"]').type('Test question 2')
    cy.get('[name="q2questionscore"]').type(5000);
    cy.get('[name="q2Answer #1"]').type('Test Answer 5')
    cy.get('[name="q2Answer #2"]').type('Test Answer 6')
    cy.get('[name="q2Answer #3"]').type('Test Answer 7')
    cy.get('[name="q2Answer #4"]').type('Test Answer 8')
    cy.get('[type="radio"]')
    cy.get('[name="q2checkAnswer #3"]').check({force:true})
  })

  it('Delete third question', function() {
    cy.wait(800)
    cy.get('[name="q2delete"]').click()
    cy.wait(500)
  })

  it('Publishes Quiz', function() {
    cy.get('.v-btn').contains('Publish Quiz').click();
    cy.wait(500)
    cy.get('.v-dialog').contains('Confirm Quiz Publish')
    cy.get('.v-btn').contains('Publish').click();
    cy.wait(500)
    cy.get('.v-dialog').contains('Success!')
    cy.get('.v-btn').contains('Go to Quiz').click();})
})
