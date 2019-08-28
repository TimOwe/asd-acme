describe('Game Playing', function() {
  before(() => {
    cy.visit('http://localhost:8080/game')
  })

  it('Enters a nickname', function() {
    cy.get('.v-toolbar__title').contains('Enter a Nickname');
    cy.get('[name="guestname"]').type('854328432843289');
    cy.get('button').click();
  })
  it('Enters a game code', function() {
    cy.get('[name="code"]').type('eee');
    cy.wait(500)
    cy.get('button').contains('Join').click();
  })
  it('Answers a question', function() {
    cy.get('.v-card')
    cy.get('[role="listbox"]').contains('uyt').click()
    cy.get('.v-card--disabled')
  })
  it('Receives feedback', function() {
    cy.get('.light-green')
    cy.get('.v-snack__wrapper').contains(`Correct! +19191 points!`)
  })
})
