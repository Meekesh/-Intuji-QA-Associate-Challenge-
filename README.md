# Setup Setps
1. Create a folder on local disk.
2. Open Command Prompt Or Git Bash.
3. Redirect to the folder you created.
4. Type npm init -y
5. Again, Type npm install cypress --save -dev

# How to Run Test
1. npx cypress open
2. After sometimes Cypress gets opened.
3. Click on the E2E testing.
4. Select the browser of your choice and clcik on the button (E.g. :- Start E2E testing in Chrome)
5. After clicking button, It opens chrome browser.
6. Search for the file and click it (e.g. login.cs.js).

# Tools/Pulgins used
1. Faker - Used to generate dynamic test data for registration, such as name,email,address,payment etc.
2. Cypress - End to end testing framework used to writing and running tests.
3. command.js 
      i) cy.registerUser() - Registers a new user with fake generated data
      ii) cy.enterFakePaymentDetailsAndSubmit() - Fills fake card details and submits the payment
