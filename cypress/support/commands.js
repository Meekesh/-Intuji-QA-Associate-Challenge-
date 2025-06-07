import { faker } from '@faker-js/faker';
Cypress.Commands.add('registerUser',() => {
    const user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zip: faker.location.zipCode(),
        mobile: faker.phone.number('##-###-####')
    };

cy.wrap(user).as('userData');

cy.visit('https://automationexercise.com');
cy.contains('Signup / Login').click();

cy.get('input[data-qa="signup-name"]').type(user.name);
cy.get('input[data-qa="signup-email"]').type(user.email);
cy.get('button[data-qa="signup-button"]').click();

cy.get('body').then($body =>{
    if ($body.text().includes('Email Address already exists!!')){
        throw new Error('Email already exists!! Try with a new email.');
    }

cy.get('#id_gender1').check();
cy.get('#password').type(user.password);
cy.get('#days').select('11');
cy.get('#months').select('April');
cy.get('#years').select('2017');
cy.get('#newsletter').check();
cy.get('#optin').check();

cy.get('#first_name').type(user.firstName);
cy.get('#last_name').type(user.lastName);
cy.get('#address1').type(user.address);
cy.get('#country').select('India');
cy.get('#state').type(user.state);
cy.get('#city').type(user.city);
cy.get('#zipcode').type(user.zip);
cy.get('#mobile_number').type(user.mobile);
cy.get('button[data-qa="create-account"]').click();

cy.contains('Account Created!').should('be.visible');
cy.get('a[data-qa="continue-button"]').click();

cy.contains(`Logged in as ${user.name}`).should('be.visible');
  });
});