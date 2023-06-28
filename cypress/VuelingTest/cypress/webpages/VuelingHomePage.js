import { paxEnum } from "../support/enums";

export class VuelingHomePage {

    // Elements
    cookies = {
        containerBtns : () => cy.getId("onetrust-button-group"),
        btnAcceptCookies : () => cy.getId("onetrust-accept-btn-handler")
    }

    searcher = {
        inputCities : (direction) => cy.getId(`AvailabilitySearchInputSearchView_TextBoxMarket${direction}1`),
        stationsList : () => cy.getId("stationsList"),
        optionAirport : (airport) => cy.get(`[data-id-code='${airport}']`),
        btnSubmit : () => cy.getId("AvailabilitySearchInputSearchView_btnClickToSearchNormal"),
        btnOw : () => cy.getId("AvailabilitySearchInputSearchView_OneWay")
    }

    datepicker = {
        div : () => cy.getId("ui-datepicker-div"),
        container : () => cy.getId("datePickerContainer"),
        month : () => cy.get(".ui-datepicker-month"),
        //btnNextMonth : () => cy.get("[data-handler='next']"),
        btnNextMonth : () => cy.get(".ui-datepicker-next"),       
        dayAvailable : () => cy.get("[data-handler='selectDay']")
    }

    paxMenu = {
        btnAddADT : (cant) => cy.getId(`DropDownListPassengerType_ADT_${cant}`),
        dropDownADT : () => cy.getId("DropDownListPassengerType_ADT_PLUS"),
        selectADT : () => cy.getId("adtSelectorDropdown"),
        listAddADT: (cant) => cy.get(`#adtSelectorDropdown [value='${cant}']`),
        selectCHDandINF : (pax_type) => cy.getId(`AvailabilitySearchInputSearchView_DropDownListPassengerType_${pax_type}`),
        dropDownCHDandINF : (pax_type) => cy.getId(`container_AvailabilitySearchInputSearchView_DropDownListPassengerType_${pax_type}`),
        listAddCHDandINF : (pax_type, cant) => cy.get(`#AvailabilitySearchInputSearchView_DropDownListPassengerType_${pax_type} [value='${cant}']`),
    }

    // Functions

    AcceptCookies() {
        //cy.wait(10000)
        this.cookies.containerBtns().should('be.visible');
        this.cookies.btnAcceptCookies().click();
    }

    SelectCity(direction, airport) {
        this.searcher.inputCities(direction).click();
        this.searcher.inputCities(direction).type(airport);
        this.searcher.stationsList().should('be.visible');
        this.searcher.optionAirport(airport).click();
    }

    SelectOW() {
        this.searcher.btnOw().click({force: true});
    }

    SelectMonth(month) {
        cy.wait(2000);
        //this.datepicker.div().should('be.visible');
        //this.datepicker.container().should('be.visible');
        this.datepicker.dayAvailable().should('be.visible');
        //show funciona para esperar a que se muestre un elemento
        //this.datepicker.container().invoke('show');
        this.datepicker.month().first().then((monthElement) => {
            const monthTitle = monthElement.text();
      
            if (month !== monthTitle) {
              this.datepicker.btnNextMonth().parent().click();
              return this.SelectMonth(month);
            }
        });
    }

    SelectFirstDayAvailable() {
        this.datepicker.dayAvailable().first().click();
    }

    SelectNDayAvailable(days) {
        this.datepicker.dayAvailable().eq(days).click();
    }

    AddADT(cant) {
        this.paxMenu.btnAddADT(cant).click();
    }

    AddPax(pax, number) {
        switch (pax) {
            case 'ADT':
                this.paxMenu.dropDownADT().should('be.visible').click();
                //this.paxMenu.listAddADT(number).click({force: true});
                this.paxMenu.selectADT().select(number).should('have.value', number);
                //this.paxMenu.dropDownADT().select(number, {force: true}).should('have.value', number);
                break;
            case 'CHD':
                this.paxMenu.dropDownCHDandINF(paxEnum.Child).click();
                //this.paxMenu.listAddCHDandINF(paxEnum.Child, number).click({force: true});
                this.paxMenu.selectCHDandINF(paxEnum.Child).select(number).should('have.value', number);
                //this.paxMenu.dropDownCHDandINF(paxEnum.Child).select(number, {force: true}).should('have.value', number);
                break; 
            case 'INFANT':
                this.paxMenu.dropDownCHDandINF(paxEnum.Infant).click();
                //this.paxMenu.listAddCHDandINF(paxEnum.Infant, number).click({force: true});
                this.paxMenu.selectCHDandINF(paxEnum.Infant).select(number).should('have.value', number);
                //this.paxMenu.dropDownCHDandINF(paxEnum.Infant).select(number, {force: true}).should('have.value', number);
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