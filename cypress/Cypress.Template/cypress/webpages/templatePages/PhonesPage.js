
export class PhonesPage {

    // Locators
    itemPhone = () => cy.get(".hrefch")
  
    // Functions
    selectFirstPhone() {
      this.itemPhone().first().click();
    }
  
    selectRandomPhone() {
      let number = Math.floor(Math.random() * 6);
      this.getRandomPhone().eq(number).click();
    }
  }