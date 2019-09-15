describe('Global Leaderboard', function () {
    before(() => {
        cy.visit('http://localhost:8080/leaderboardselect')
    })
    it('Finds quiz', function () {
        cy.get(':nth-child(2)').contains('.v-card__title', 'Tim\'s Test Quiz');
        cy.get(':nth-child(2) > .v-card > .v-card__actions > .v-btn').contains('View Leaderboard').click();
    })
    it('Sorts by descending', function () {
        cy.get('button').contains('Order Descending').click();
        cy.get('table').find('tr');
    })
    it('Sorts by Ascending', function () {
        cy.get('button').contains('Order Ascending').click();
        cy.get('table').find('tr');
    })
})
