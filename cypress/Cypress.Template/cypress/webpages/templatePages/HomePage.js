
import "cypress-xpath/src/index";

export class HomePage {
  
  // Locators
  loginButton = () => cy.getId("login2"); //getId is declared in support/commands.js as a new custom command for cy
  homeButton = () => cy.contains("Home ");
  categoryPhones = () => cy.get(`[onclick="byCat('phone')"]`);
  categoryNotebooks = () => cy.get(`[onclick="byCat('notebook')"]`);
  categoryMonitors = () => cy.get(`[onclick="byCat('monitor')"]`);
  btnCart = () => cy.get("#cartur");
  btnContact = () => cy.contains('a','Contact');
  nameUserLoged = () => cy.getId("nameofuser");
  btnLogout = () => cy.getId("logout2");
  btnSignup = () => cy.getId("signin2");

  // Functions
  clickLogin() {
    this.loginButton().click().should("be.visible");
  }

  goToCategory(category) {
    category.click();
  }

  goToCart() {
    this.btnCart().click();
  }

  goToHome() {
    this.homeButton().click();
  }

  clickContact(){
    this.btnContact().click();
  }


  clickLogout() {
    this.btnLogout().click();
  }

  checkUserLogedOut() {
    this.loginButton().should("be.visible");
  }

  clickSignup() {
    this.btnSignup().click().should("be.visible");
  }
}