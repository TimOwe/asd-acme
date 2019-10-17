describe('Global Leaderboard', function () {
    before(() => {
        cy.visit('http://localhost:8080/leaderboardselect')
    })
    it('Finds quiz', function () {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .white--text').contains('View Leaderboard').click();
    })
    it('Sorts by descending', function () {
        cy.get('button').contains('Order Descending').click();
    })
    it('Sorts by Ascending', function () {
        cy.get('button').contains('Order Ascending').click();
    })
})
