describe('09 Game Playing', function () {
    before(() => {
      cy.visit('http://localhost:8080/game')
    })

    it('Enters a nickname', function () {
      cy.get('.v-toolbar__title').contains('Enter a Nickname');
      cy.get('[name="guestname"]').type(`test${Math.round(Math.random()*1000)}`);
      cy.get('button').click();
    })
    it('Enters a game code', function () {
      cy.get('[name="code"]').type(`eehclr`);
      cy.get('button').contains('Join').click();
      cy.get('.v-toolbar__title').should('not.contain', 'Enter a Nickname');
    })
    it('Validates game code', function () {
      cy.get('[name="quizTitle"').should('contain', 'Tim\'s Test Quiz');
    })
  })
