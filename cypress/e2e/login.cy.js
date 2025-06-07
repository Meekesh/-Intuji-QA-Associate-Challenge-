describe('Logout and ReLogin',()=>{
    it('Register user,logs out,relogin and verify', function(){
        cy.visit('https://automationexercise.com');
        cy.registerUser();

        cy.get('@userData').then((user)=> {
            cy.get('a[href="/logout"]').click();//Logout
        
        cy.url().should('include','/login');// sign in and sign up page

        cy.get('input[data-qa="login-email"]').type(user.email);//relogin with same credintials
        cy.get('input[data-qa="login-password"]').type(user.password);
        cy.get('button[data-qa="login-button"]').click();

        cy.contains(`Logged in as ${user.name}`).should('be.visible');//verify user back login
        })
    })
})