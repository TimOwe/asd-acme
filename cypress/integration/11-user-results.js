describe('User Results', function () {
    before(() => {
        cy.visit('http://localhost:8080/user-results/-LpLPFDilewY1gJSlGFw')
    })
    it('Views graph', function () {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .v-btn--left').click();
        cy.get('.v-card > .container > :nth-child(1) > .v-btn').click();
    })
    it('Views question breakdown', function () {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .v-btn--right').click();
        cy.get('.white--text > .v-btn__content').click();
    })
})
