
import { LevelHomePage } from "../webpages/LevelHomePage";

describe("LevelTest - buy a flight", () => {

  const levelHomePage = new LevelHomePage(); 
  let dataTest = "";

  before(() => {
      cy.fixture("data").then((data) => {
        dataTest = data
      })
  })

  beforeEach(() => {
    cy.visit('', {
      headers: {
          'accept': 'application/json, text/plain, */*',
          'user-agent': 'axios/0.27.2'
        }
    });
  });


  it("BCN-EZE, OW, 2ADT-1INF",() => {
    
    levelHomePage.AcceptCookies();
    //levelHomePage.SelectOW();
    levelHomePage.SelectOrigin(dataTest.origin);
    levelHomePage.SelectDestination(dataTest.destination);
    levelHomePage.ChangeTrip();
    levelHomePage.SelectMonthInCalendar(dataTest.month);
    levelHomePage.SelectFirstDayAvailable();
    levelHomePage.ClickDropDownPassengers();
    levelHomePage.AddADT(dataTest.ADT);
    levelHomePage.AddINF(dataTest.INF);
    levelHomePage.ClickConfirmPax();
    levelHomePage.divSearcher().screenshot("Searcher after fill data");
    levelHomePage.SubmitSearch();

  });

  after(() => {
    cy.screenshot("Final screenshot");
    cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });

});
