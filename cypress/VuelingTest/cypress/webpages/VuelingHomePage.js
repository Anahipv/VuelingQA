import { paxEnum } from "../support/enums";

export class VuelingHomePage {

    // Elements
    btnAcceptCookies = () => cy.getId("onetrust-accept-btn-handler");

    searcher = {
        inputCities : (direction) => cy.getId(`AvailabilitySearchInputSearchView_TextBoxMarket${direction}1`),
        listCities : () => cy.getId("stationsList"),
        btnSubmit : () => cy.getId("AvailabilitySearchInputSearchView_btnClickToSearchNormal"),
        btnOw : () => cy.getId("AvailabilitySearchInputSearchView_OneWay")
    }

    datepicker = {
        div : () => cy.getId("ui-datepicker-div"),
        month : () => cy.get(".ui-datepicker-month"),
        btnNextMonth : () => cy.get("[data-handler='next']"),
        dayAvailable : () => cy.get("[data-handler='selectDay']")
    }

    paxMenu = {
        btnAddADT : (cant) => cy.getId(`DropDownListPassengerType_ADT_${cant}`),
        dropDownADT : () => cy.getId("adtSelectorDropdown"),
        listAddADT: (cant) => cy.get(`#adtSelectorDropdown [value='${cant}']`),
        dropDownCHDandINF : (pax_type) => cy.getId(`container_AvailabilitySearchInputSearchView_DropDownListPassengerType_${pax_type}`),
        listAddCHDandINF : (pax_type, cant) => cy.get(`#AvailabilitySearchInputSearchView_DropDownListPassengerType_${pax_type} [value='${cant}']`),
    }

    // Functions

    AcceptCookies() {
        this.btnAcceptCookies().should('be.visible').click();
    }

    SelectCity(direction, airport) {
        this.searcher.inputCities(direction).click();
        this.searcher.inputCities(direction).type(airport);
        this.searcher.listCities().should('be.visible').click();
    }

    SelectOW() {
        this.searcher.btnOw().click();
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

    AddADT(cant) {
        this.paxMenu.btnAddADT(cant).click();
    }

    AddPax(pax, number) {
        switch (pax) {
            case 'ADT':
                this.paxMenu.dropDownADT().click();
                this.paxMenu.listAddADT(number).click();
                break;
            case 'CHD':
                this.paxMenu.dropDownCHDandINF(paxEnum.Child).click();
                this.paxMenu.listAddCHDandINF(paxEnum.Child, number).click();
                break; 
            case 'INFANT':
                this.paxMenu.dropDownCHDandINF(paxEnum.Infant).click();
                this.paxMenu.listAddCHDandINF(paxEnum.Infant, number).click();
                break; 
            default:
                cy.log('La referencia de pasajero es incorrecta');                                  
        }
    }

    selectPax(numAdults, numChilds, numInfants) {
        this.AddPax(paxEnum.Adult, numAdults);
        this.AddPax(paxEnum.Child, numChilds);
        this.AddPax(paxEnum.Infant, numInfants);
    }

    SubmitSearcher() {
        this.searcher.btnSubmit().should('be.visible').click();
    }
}