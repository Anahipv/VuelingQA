
export class STVPage {

    // Elements

    flightCards = {
        container : () => cy.getId("flightCardsContainer"),
        cards : () => cy.get("[data-js-id='flightCard']"),
        airlineFlight : (airline) => cy.get(`[codeshare='${airline}']`)
    }

    fares = {
        container : () => cy.getId("faresList"),
        card : (fare) => cy.getId(`${fare}FareBox`)
    }

    submit = () => cy.getId("stvContinueButton")

    // Functions

    SelectFirstFlight() {
        this.flightCards.container().should('be.visible');
        this.flightCards.cards().first().click();
    }

    SelectFlightByAirline(airline) {
        this.flightCards.airlineFlight(airline).first().parent().click();
    }

    SelectFare(fare) {
        this.fares.container().should('be.visible');
        this.fares.card(fare).click();
    }

    SubmitSelection() {
        this.submit().click();
    }
}