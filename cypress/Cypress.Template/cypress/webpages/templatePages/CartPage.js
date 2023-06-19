
export class CartPage {
    //Locators
    btnPlaceOrder = () => cy.get("[data-target='#orderModal']");
    formName = () => cy.getId("name");
    formCountry = () => cy.getId("country");
    formCity = () => cy.getId("city");
    formCard = () => cy.getId("card");
    formMonth = () => cy.getId("month");
    formYear = () => cy.getId("year");
    btnPurchase = () => cy.get("[onclick ='purchaseOrder()']");
    imgSuccess = () => cy.get(".sa-success");
    tableBody = () => cy.getId("tbodyid");
    deleteItemButton = () => cy.xpath("(//a[contains(@onclick , 'delete')])[1]");
  
    //Functions
    placeOrder() {
      this.tableBody().should("not.to.be.empty");
      this.btnPlaceOrder().click();
    }
  
    fillForm() {
      // In the fixtures folder you can create your json with different data scenarios 
      // Then to use them you just have to call them like below 
      cy.fixture("data").then((formData) => {
        this.formName().type(formData.name);
        this.formCountry().type(formData.country);
        this.formCity().type(formData.city);
        this.formCard().type(formData.credit_card);
        this.formMonth().type(formData.month);
        this.formYear().type(formData.year);
        this.btnPurchase().click();
      });
    }
  
    assertPurchaseCompleted() {
      this.imgSuccess().should("exist").and("be.visible");
    }
  
    deleteItem() {
      this.deleteItemButton().click().should("be.visible");
    }
  }