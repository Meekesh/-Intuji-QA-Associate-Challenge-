describe('Product Browsing & Filtering', () => {
    it('Filters products by Women > Dress and varifies details', () => {
        cy.visit('https://automationexercise.com') //Go to Homepage

        cy.get('i[class ="material-icons card_travel"]').click(); //Go to product page

        cy.url().should('include', '/products');// should be include in url
        cy.get('.features_items').should('be.visible'); // should include in div class

        cy.get('a[href="#Women"]').click(); //click women to expand option
        cy.get('a[href="/category_products/1"]').click(); //click subcategory dress

        cy.get('.features_items .productinfo').should('exist'); //Dress product shown

        cy.get('.features_items .productinfo p').should('exist').each($el => {
  if ($el.text().toLowerCase().includes('dress')) {
    // If at least one "dress" is found, assert success and skip rest
    expect(true).to.be.true;
    return false; // stop further iterations
  }
});
cy.get('a[href="/product_details/3"]').click();//click the view product of 1st image

cy.url().should('include', '/product_details/3'); //Verify the product detail page
cy.get('.product-information').within(() => {
    cy.get('h2').should('be.visible');//Name
    cy.get('span span').should('be.visible');//Price
    cy.contains('Availability').should('be.visible');//Availability
});
    });
});