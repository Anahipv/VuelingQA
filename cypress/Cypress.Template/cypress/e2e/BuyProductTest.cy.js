import { HomePage } from "../webpages/templatePages/HomePage"; //! Webpage Import
import { PhonesPage } from "../webpages/templatePages/PhonesPage";
import { ProductPage } from "../webpages/templatePages/ProductPage";
import { CartPage } from "../webpages/templatePages/CartPage";


// One file per test group, for example it is not the same to buy a product or log in

describe("Buy Product Test", () => { // The container of the tests (must contain the same name as the file)

  // let/const for all the tests
  const homePage = new HomePage(); // Object of the webpage
  const phonesPage = new PhonesPage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  before(() => { // This will be executed only once before and for all the tests
  
  });

  beforeEach(() => { // This will be executed before the execution of every test
    cy.visit('');
    //cy.visit('/index.html'); ---> Path added to the base URL
  });

  it("Buy a phone",() => { // Independent Test Case
      homePage.goToCategory(homePage.categoryPhones());
      phonesPage.selectFirstPhone();
      productPage.addToCart();
      homePage.goToCart();
      cartPage.placeOrder();
      cartPage.fillForm();
      cartPage.assertPurchaseCompleted();

  });

  xit("Buy a phone",() => { // This is only a example about xit, with the 'x' you omit the test run
    homePage.goToCategory(homePage.categoryPhones());
    phonesPage.selectFirstPhone();
    productPage.addToCart();
    homePage.goToCart();
    cartPage.placeOrder();
    cartPage.fillForm();
    cartPage.assertPurchaseCompleted();

});

  after(() => { // This will be executed only once after and for all the tests

  });

  afterEach(() => { // This will be executed after the execution of every test
    
  });
});

