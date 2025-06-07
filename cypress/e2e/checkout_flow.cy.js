describe('Checkout Flow With Fake Payment', function(){
    it('Add product and procees chaeckout with fake id',function(){
        cy.registerUser();

        cy.get('@userData').then((user)=>{
            cy.contains(`Logged in as ${user.name}`).should('be.visible');
        });
                   
        cy.get('a[href="#Men"]').click();//add item from men -> tshirt
        cy.get('a[href="/category_products/3"').click();
        
        cy.get('.product-image-wrapper').first().within(()=>{
        cy.get('a[data-product-id]').contains('Add to cart').click();// used this method because a[data-product-id="2"] data is shown 2 in the elements
        });

        cy.wait(1000);
        cy.get('a[href="/view_cart"] > u').click(); //Proceed to checkout

        cy.get('a[class="btn btn-default check_out"]').click();
        cy.get('.checkout-information').should('exist');
        cy.get('a[href="/payment"]').click();

       cy.enterFakePaymentDetailsAndSubmit();
       cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
});
});