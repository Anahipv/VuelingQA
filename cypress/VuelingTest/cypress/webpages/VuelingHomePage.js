import { paxEnum } from "../support/enums";

export class VuelingHomePage {

    // Elements
    btnAcceptCookies = () => cy.getId("onetrust-accept-btn-handler");

    searcher = {
        inputCities : (direction) => cy.getId(`${direction}Input`),
        listCities : () => cy.get(".liStation"),
        airportSelected : (direction) => cy.get(`.${direction} .prefix`),
        btnSubmit : () => cy.getId("btnSubmitHomeSearcher")
    }

    datepicker = {
        checkOW : () => cy.get("#onewayList .radio-circle_inner"),
        month : () => cy.get(".ui-datepicker-month"),
        btnNextMonth : () => cy.getId("nextButtonCalendar"),
        dayAvailable : () => cy.get("#calendarDaysTable [aria-disabled='false']")
    }

    paxMenu = {
        dropDown : () => cy.getId("passengersInputLabel"),
        btnAddPax : (pax) => cy.getId(`${pax}Increase`),
        containerPax : () => cy.get(".passengers-popup_main"),
        paxCount : () => cy.get(".number"),
        btnAcceptINF : () => cy.get("[title='Aceptar']")
    }

    // Functions

    AcceptCookies() {
        this.btnAcceptCookies().should('be.visible').click();
    }

    SelectCity(direction, airport) {
        this.searcher.inputCities(direction).click();
        this.searcher.inputCities(direction).type(airport);
        this.searcher.listCities().should('be.visible').click();
        this.searcher.airportSelected(direction).should('have.text', airport);
    }

    SelectOW() {
        this.datepicker.checkOW().click({force: true});
    }

    SelectMonth(month) {
        this.datepicker.month().first().then((monthElement) => {
            const monthTitle = monthElement.text();
      
            if (month !== monthTitle) {
              this.datepicker.btnNextMonth().click();
            }
        });
    }

    SelectFirstDayAvailable() {
        this.datepicker.dayAvailable().first().click();
    }

    AddPax(pax, number) {
        switch (pax) {
            case 'adults':
                this.paxMenu.paxCount().first().then((paxElement) => {
                    const paxNumber = paxElement.text();
              
                      if (paxNumber !== number) {
                        this.paxMenu.btnAddPax(pax).click();
                        this.AddPax(pax, number);
                      }
                  });
                break;
            case 'children':
                this.paxMenu.paxCount().eq(1).then((paxElement) => {
                    const paxNumber = paxElement.text();
              
                      if (paxNumber !== number) {
                        this.paxMenu.btnAddPax(pax).click();
                        this.AddPax(pax, number);
                      }
                  });
                break; 
            case 'infants':
                this.paxMenu.paxCount().eq(2).then((paxElement) => {
                    const paxNumber = paxElement.text();
              
                      if (paxNumber !== number) {
                        this.paxMenu.btnAddPax(pax).click();
                        this.AddPax(pax, number);
                      }
                      if (paxNumber == "1") {
                        this.paxMenu.btnAcceptINF().should('be.visible').click();
                      }
                  });
                //this.paxMenu.btnAcceptINF().should('be.visible').click();
                break; 
            default:
                cy.log('La referencia de pasajero es incorrecta');                                  
        }
    }

    selectPax(numAdults, numChilds, numInfants) {
        this.paxMenu.dropDown().click();
        this.AddPax(paxEnum.Adult, numAdults);
        this.paxMenu.paxCount().first().should("have.text", numAdults);
        this.AddPax(paxEnum.Child, numChilds);
        this.paxMenu.paxCount().eq(1).should("have.text", numChilds);
        this.AddPax(paxEnum.Infant, numInfants);
        this.paxMenu.paxCount().eq(2).should("have.text", numInfants);
    }

    SubmitSearcher() {
        this.searcher.btnSubmit().should('be.visible').click();
    }
}