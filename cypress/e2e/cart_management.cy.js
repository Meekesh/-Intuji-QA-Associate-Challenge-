describe('Cart and Quantity Management',() => {
    it('Adds items, updates quantity, verifies totals and removes a product',()=>{
        cy.visit('https://automationexercise.com'); 
        
        
        cy.get('i[class ="material-icons card_travel"]').click(); //Add first item from Women -> Dress
        cy.get('a[href="#Women"]').click(); 
        cy.get('a[href="/category_products/1"]').click();

        cy.get(' .product-image-wrapper').first().within(()=> {
        cy.get('a[data-product-id]').contains('Add to cart').click();// used this method because a[data-product-id="3"] data is shown 2 in the elements
        });
        cy.wait(1000);//pause test for 1000 milliseconds
        cy.get('button[class="btn btn-success close-modal btn-block"]').click();

        cy.get('a[href="#Men"]').click();//add second item from men -> tshirt
        cy.get('a[href="/category_products/3"').click();

        cy.get('.product-image-wrapper').first().within(()=>{
        cy.get('a[data-product-id]').contains('Add to cart').click();// used this method because a[data-product-id="2"] data is shown 2 in the elements
        });
        cy.wait(1000);
        cy.get('a[href="/view_cart"] > u').click();

        cy.url().should('include','/view_cart');//Verify both items are in the cart
        cy.get('.cart_info tbody tr').should('have.length.at.least',2);

       cy.get('a[href="/product_details/3"]').click();
       cy.get('input[type="number"]').first().clear().type('3');
       cy.get('input[type="number"]').first().blur(); // force update
       cy.wait(1000);

        cy.get('button[type="button"]').click();
        cy.get('a[href="/view_cart"] > u').click();
        cy.get('.cart_info tbody tr').first().within(() => { // verify total = price * quantity
            cy.get('.cart_price').invoke('text').then(priceText => {
                const price = parseFloat(priceText.replace(/[^0-9.]/g,''));
            cy.get('.cart_total').invoke('text').then(totalText => {
                const total = parseFloat(totalText.replace(/[^0-9.]/g,''));
                expect(total).to.be.closeTo(price * 4,0.01);
            });
        });
    });

    cy.get('a[data-product-id="3"] ').click();//Remove 1st time of cart
    cy.wait(1000);

    cy.get('.cart_info tbody tr').should('have.length',1); //Verift cart has only 1 product
    });
});