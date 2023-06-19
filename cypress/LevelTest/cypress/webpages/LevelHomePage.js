/// <reference types='cypress-xpath' />

export class LevelHomePage {

    btnCookies = () => cy.getId("ensCloseBanner");
    dropDownTrip = () => cy.get("[data-target='dropdown-trip']");
    btnOW = () => cy.get("a[value='OW']");
    btnOrigin = () => cy.get("[data-field='origin']");
    btnDestination = () => cy.get("[data-field='destination']");
    //originOption = (airport) => cy.get(`//div[@class='iata' and text()=${airport}]`)
    // .origin .group-info:not(.hidden)
    airportOrigin = (airport) => cy.xpath(`//div[@class='list-items origin js-list-items']//div[text()='${airport}']`);
    airportDestination = (airport) => cy.xpath(`//div[@class='list-items destination js-list-items']//div[text()='${airport}']`);
    btnIconCheck = () => cy.get(".icon-check-thin");
    monthTitle = () => cy.get(".month");
    btnNextMonth = () => cy.get(".datepicker__next-action");
    dayAvailable = () => cy.get(".is-available:not(.is-previous-month)");
    dropDownPassengers = () => cy.get(".searcher-passengers");
    btnAddADT = () => cy.get("[data-field='adult'] [class*='icon-plus']");
    btnAddINF = () => cy.get("[data-field='infant'] [class*='icon-plus']");
    btnConfirmPax = () => cy.get(".btn-pax");
    countADT = () => cy.get("[data-field='adult'] [class*='pax-count']");
    countINF = () => cy.get("[data-field='infant'] [class*='pax-count']");
    btnSearcher = () => cy.getId("searcher_submit_buttons");
    divSearcher = () => cy.get(".hero-plane-container");

    AcceptCookies() {
        this.btnCookies().should('be.visible').click();
        cy.scrollTo('top');
    }

    SelectOW() {
        this.dropDownTrip().click();
        this.btnOW().should('be.visible').click({force: true});
    }

    ChangeTrip() {
        this.btnIconCheck().should('be.visible').click();
    }

    SelectOrigin(airport) {
        this.btnOrigin().should('be.visible').click();
        this.airportOrigin(airport).click();
    }

    SelectDestination(airport) {
        this.btnDestination().should('be.visible').click();
        this.airportDestination(airport).last().click();
    }

    SelectMonthInCalendar(month) {
        this.monthTitle().should("be.visible");
    
        this.monthTitle()
          .invoke("text")
          .then((monthName) => {
            Cypress.on("uncaught:exception", (err, runnable) => {
              return false;
              // returning false here prevents Cypress from
              // failing the test
            });
    
            if (monthName !== month) {
              this.btnNextMonth().click();
              return this.SelectMonthInCalendar(month);
            }
            cy.scrollTo('top');
          });
    }

    SelectFirstDayAvailable()  {
        this.dayAvailable().first().click();
    }

    /*AddPassengers() {
        this.dropDownPassengers().click();
        this.addADT().first().click();
        this.addINF().first().click();
        this.btnConfirmPax().click();
    }*/

    ClickDropDownPassengers() {
        this.dropDownPassengers().click();
    }

    AddADT(cantADT) {
        this.countADT().should("be.visible");
    
        this.countADT()
          .invoke("text")
          .then((count) => {
            Cypress.on("uncaught:exception", (err, runnable) => {
                return false;
                // returning false here prevents Cypress from
                // failing the test
              });
            if (count !== cantADT) {
                this.btnAddADT().first().click();
                return this.AddADT(cantADT);
            }
        });
    }

    AddINF(cantINF) {
        this.countINF().should("be.visible");
        
        this.countINF()
          .invoke("text")
          .then((count) => {
            Cypress.on("uncaught:exception", (err, runnable) => {
                return false;
                // returning false here prevents Cypress from
                // failing the test
              });
            if (count !== cantINF) {
                this.btnAddINF().first().click();
                return this.AddINF(cantINF);
            }
        });
    }

    ClickConfirmPax() {
        this.btnConfirmPax().should('be.visible').click();
    }

    /*AddPassengers(cantADT, cantINF) {
        this.dropDownPassengers().click();
        this.countADT().should("be.visible");
    
        this.countADT()
          .invoke("text")
          .then((count) => {
            Cypress.on("uncaught:exception", (err, runnable) => {
                return false;
                // returning false here prevents Cypress from
                // failing the test
              });
            if (count !== cantADT) {
                this.addADT().first().click();
                return this.AddPassengers(cantADT, cantINF);
            }
        });

        this.countINF().should("be.visible");
        
        this.countINF()
          .invoke("text")
          .then((count) => {
            Cypress.on("uncaught:exception", (err, runnable) => {
                return false;
                // returning false here prevents Cypress from
                // failing the test
              });
            if (count !== cantINF) {
                this.addINF().first().click();
                return this.AddPassengers(cantADT, cantINF);
            }
        });
        
        this.btnConfirmPax().click();
    }*/

    SubmitSearch() {
        this.btnSearcher().should('be.visible').click();
    }
}