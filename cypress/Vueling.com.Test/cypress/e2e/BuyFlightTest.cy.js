
import { VuelingHomePage } from "../webpages/VuelingHomePage";

/*BCN-ATH (Atenas)
Solo ida
2 Adultos, 1 Bebe
Primer dia disponible del mes de agosto
Click en Buscar Vuelo */

describe("VuelingTest - buy a flight", () => {

  const vuelingHomePage = new VuelingHomePage(); 
  let dataTest = "";

  before(() => {
      cy.fixture("data").then((data) => {
        dataTest = data
      })
  })

  beforeEach(() => {
    cy.visit('')
  });


  it("BCN-ATH, OW, 2ADT-1INF",() => {

    vuelingHomePage.AcceptCookies();
    vuelingHomePage.SelectCity("origin", dataTest.origin);
    vuelingHomePage.SelectCity("destination", dataTest.destination);
    //vuelingHomePage.SelectOW();
    vuelingHomePage.SelectMonth(dataTest.month);
    vuelingHomePage.SelectFirstDayAvailable();
    vuelingHomePage.SelectOW();
    vuelingHomePage.selectPax(dataTest.ADT, dataTest.CHD, dataTest.INF);
    vuelingHomePage.SubmitSearcher();

  });

  after(() => {
    //cy.screenshot("Final screenshot");
    //cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });

});
