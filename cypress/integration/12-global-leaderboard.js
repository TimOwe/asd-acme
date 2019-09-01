describe('Global Leaderboard', function () {
    before(() => {
        cy.visit('http://localhost:8080/leaderboard')
    })
    it('Has user entries', function () {
        cy.get('table').contains('td', 'Daniel Hartshorne');
        cy.get('table').contains('td', 'Tim Owe');
        cy.get('table').contains('td', 'Alex Blazevski');
    })
    it('Sorts by descending', function () {
        cy.get('button').contains('Sort Descending').click();
        cy.get('table').contains('tr', 'Daniel Hartshorne').and('contain', '87%').and('contain', '1');
        cy.get('table').contains('tr', 'Alex Blazevski').and ('contain', '49%').and('contain', '3');
    })
    it('Sorts by Ascending', function () {
        cy.get('button').contains('Sort Ascending').click();
        cy.get('table').contains('tr', 'Daniel Hartshorne').and('contain', '87%').and('contain', '1');
        cy.get('table').contains('tr', 'Alex Blazevski').and ('contain', '49%').and('contain', '3');
    })
})
