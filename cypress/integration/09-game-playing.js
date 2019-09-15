describe('Game Playing', function () {
  before(() => {
    cy.visit('http://localhost:8080/game')
  })

  it('Enters a nickname', function () {
    cy.get('.v-toolbar__title').contains('Enter a Nickname');
    cy.get('[name="guestname"]').type(`test${Math.round(Math.random()*1000)}`);
    cy.get('button').click();
  })
  it('Enters a game code', function () {
    cy.wait(500)
    cy.get('[name="code"]').type('1jaqxc');
    cy.get('button').contains('Join').click();
    cy.wait(500)
    cy.get('.v-toolbar__title').should('not.contain', 'Enter a Nickname');
  })
  it('Answers a question', function () {
    cy.get('.v-card')
    cy.get('[role="listbox"]').contains('Canberra').click()
    cy.get('.v-card--disabled')
  })
  it('Receives feedback', function () {
    cy.wait(500)
    cy.get('.light-green')
    cy.get('.v-snack__wrapper').contains(`Correct! +20 points!`)
  })
  it('Ends Quiz', function () {
    cy.get('.v-btn--depressed').contains('Done').click()
    cy.get('.text--primary').contains('You scored')
  })
})
