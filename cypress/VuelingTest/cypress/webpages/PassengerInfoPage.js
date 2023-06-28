export class PassengerInfoPage {

    //Elements

    formPax = {
        container : () => cy.getId("passengerInformation"),
        inputFirstName : (position) => cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${position}`),
        inputLastName : (position) => cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${position}`),
        inputFirstNameINF : (position) => cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${position}_${position}`),
        inputLastNameINF : (position) => cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${position}_${position}`),
        inputBirthdateCHD : (position) => cy.getId(`birthDate${position}`),
        inputBirthdateINF : (position) => cy.getId(`birthDate${position + 1}_${position + 1}`),
        submit : () => cy.get(".booking-contact_form_button")
    }

    formContact = {
        selectCountry : () => cy.getId("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_DropDownListCountry"),
        phone : () => cy.getId("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxHomePhone"),
        email : () => cy.getId("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxEmailAddress")
    }

    btnPrivPol = () => cy.getId("fsAcceptsPrivPol");
    btnSubmit = () => cy.getId("ContactViewControlGroupMainContact_BoxPassengerInformationView_LinkButtonSubmit");

    // Function

    FillFormPax(pax, data) {
        let countCHD = 1;
        for(let i=0; i<pax; i++) {
            this.formPax.inputFirstName(i).type(data[i].name);
            this.formPax.inputLastName(i).type(data[i].lastName);
            if(data[i].birthdate != "") {
                this.formPax.inputBirthdateCHD(countCHD).type(data[i].birthdate);
                countCHD ++;
            } else if (data[i].INF != "") {
                this.formPax.inputFirstNameINF(i).type(data[i].INF.name);
                this.formPax.inputLastNameINF(i).type(data[i].INF.lastName);
                this.formPax.inputBirthdateINF(i).type(data[i].INF.birthdate);
            };
            this.formPax.submit().eq(i).click();
        }
    }

    FillFormContact(data) {
        this.formContact.selectCountry().select(data.country).should('have.value', data.country);
        this.formContact.phone().type(data.phone);
        this.formContact.email().type(data.email);
    }

    SubmitInfo() {
        this.btnPrivPol().click();
        this.btnSubmit().click();
    }
}