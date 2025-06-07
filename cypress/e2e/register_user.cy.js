describe('User Registration and Session Handling',() => {
    it('Registers a user and stores session', function (){
        cy.registerUser();

        cy.getCookies().then(cookies => {
            cy.writeFile('cypress/fixtures/session.json',cookies);
        });
    });

    it('Reuses session from saved cookies', function (){
        cy.readFile('cypress/fixtures/session.json').then(cookies => {
            cy.clearCookies();

            cookies.forEach(cookie => {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    path: cookie.path,
                    secure:cookie.secure,
                    httpOnly: cookie.httpOnly,
                });
            });

            cy.visit('https://automationexercise.com');
            cy.contains('Logged in as').should('be.visible');
        });
    });
});