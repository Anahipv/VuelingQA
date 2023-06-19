
export class ProductPage {
    //Locators
    btnAddToCart = () => cy.get(".btn-success");
  
    //Functions
    addToCart() {
      this.btnAddToCart().should("exist");
      this.btnAddToCart().click();
    }
  }