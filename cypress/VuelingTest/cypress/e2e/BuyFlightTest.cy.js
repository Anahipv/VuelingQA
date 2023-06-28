
import { VuelingHomePage } from "../webpages/VuelingHomePage";
import { STVPage } from "../webpages/STVPage";
import { PassengerInfoPage } from "../webpages/PassengerInfoPage";

describe("VuelingTest - buy a flight", () => {

  const vuelingHomePage = new VuelingHomePage(); 
  const stvPage = new STVPage();
  const passengerInfoPage = new PassengerInfoPage();
  let dataTest = "";

  before(() => {
      cy.fixture("data").then((data) => {
        dataTest = data
      })
  })

  beforeEach(() => {
    cy.visit('')
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });


  xit("Test case 0 : BCN-ATH, OW, 2ADT-1INF, Basic",() => {

    vuelingHomePage.AcceptCookies();
    vuelingHomePage.SelectOW();
    vuelingHomePage.SelectCity("Origin", dataTest[0].origin);
    vuelingHomePage.SelectCity("Destination", dataTest[0].destination);
    vuelingHomePage.SelectMonth(dataTest[0].month);
    vuelingHomePage.SelectFirstDayAvailable();
    //vuelingHomePage.AddADT(dataTest.ADT)
    vuelingHomePage.selectPax(dataTest[0].ADT, dataTest[0].CHD, dataTest[0].INF);
    vuelingHomePage.SubmitSearcher();
    stvPage.SelectFirstFlight();
    stvPage.SelectFare(dataTest[0].fare);
    cy.wait(1000)
    stvPage.SubmitSelection();
    passengerInfoPage.FillFormPax(dataTest[0].paxTotal, dataTest[0].infoPax);
    passengerInfoPage.FillFormContact(dataTest[0].contact);
    passengerInfoPage.SubmitInfo()
  });

  xit("Test case 1 : BCN-MAD, OW, 4ADT-2CHD-2INF, TimeFlex, Vueling",() => {

    vuelingHomePage.AcceptCookies();
    vuelingHomePage.SelectOW();
    vuelingHomePage.SelectCity("Origin", dataTest[1].origin);
    vuelingHomePage.SelectCity("Destination", dataTest[1].destination);
    vuelingHomePage.SelectMonth(dataTest[1].month);
    vuelingHomePage.SelectFirstDayAvailable();
    //vuelingHomePage.AddADT(dataTest.ADT)
    vuelingHomePage.selectPax(dataTest[1].ADT, dataTest[1].CHD, dataTest[1].INF);
    vuelingHomePage.SubmitSearcher();
    stvPage.SelectFlightByAirline(dataTest[1].airline);
    stvPage.SelectFare(dataTest[1].fare);
    cy.wait(1000)
    stvPage.SubmitSelection();
    passengerInfoPage.FillFormPax(dataTest[1].paxTotal, dataTest[1].infoPax);
    passengerInfoPage.FillFormContact(dataTest[1].contact);
    passengerInfoPage.SubmitInfo()
  });

  it("Test case 2 : BCN-MAD, RT, 2ADT-1CHD, Optima",() => {

    vuelingHomePage.AcceptCookies();
    vuelingHomePage.SelectCity("Origin", dataTest[2].origin);
    vuelingHomePage.SelectCity("Destination", dataTest[2].destination);
    vuelingHomePage.SelectNDayAvailable(dataTest.RT.ida);
    vuelingHomePage.SelectNDayAvailable(dataTest.RT.vuelta);
    vuelingHomePage.selectPax(dataTest[2].ADT, dataTest[2].CHD, dataTest[2].INF);
    vuelingHomePage.SubmitSearcher();
    stvPage.SelectFirstFlight();
    stvPage.SelectFare(dataTest[2].fare);
    cy.wait(1000)
    stvPage.SubmitSelection();
    passengerInfoPage.FillFormPax(dataTest[2].paxTotal, dataTest[2].infoPax);
    passengerInfoPage.FillFormContact(dataTest[2].contact);
    passengerInfoPage.SubmitInfo()
  });

});
