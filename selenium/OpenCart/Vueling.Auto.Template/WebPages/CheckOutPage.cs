using OpenCart.WebPages.Base;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using OpenCart.Common;
using OpenQA.Selenium.Support.UI;
using NUnit.Framework;
using OpenQA.Selenium;
using System;
using OpenCart.SetUp;

namespace OpenCart.WebPages
{
    public class CheckOutPage : CommonPage

    {
        public CheckOutPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement ElementsFormBillingDetails(string id_element) { return WebDriver.FindElementById(id_element); }
        private IWebElement BtnContinueBillingDetails { get { return WebDriver.FindElementById("button-payment-address"); } }
        private IWebElement BtnRegister { get { return WebDriver.FindElementById("button-account"); } }
        private IWebElement BtnConfirmNewAccount { get { return WebDriver.FindElementById("button-register"); } }
        private IWebElement BtnNewAdress { get { return WebDriver.FindElementByXPath("//input[@name='payment_address']"); } }
        private IWebElement BtnContinueDeliveryDetails { get { return WebDriver.FindElementById("button-shipping-address"); } }
        private IWebElement BtnContinueDeliveryMethod { get { return WebDriver.FindElementById("button-shipping-method"); } }
        private IWebElement BtnContinuePaymenMethod { get { return WebDriver.FindElementById("button-payment-method"); } }
        private IWebElement BtnConfirmOrder { get { return WebDriver.FindElementById("button-confirm"); } }
        private IWebElement BtnAgree { get { return WebDriver.FindElementByXPath("//input[@name='agree']"); } }
        private IWebElement TitleCkeckOut { get { return WebDriver.FindElementByXPath("//h1[text()='Checkout']"); } }
        private IWebElement TtileOrderSuccessfull { get { return WebDriver.FindElementByXPath("//h1[text()='Your order has been placed!']"); } }
        private IWebElement OptionsCountry(string country) { return WebDriver.FindElementByXPath($"//option[text()='{country}']"); }
        private IWebElement OptionsRegion(string region) { return WebDriver.FindElementByXPath($"//option[text()='{region}']"); }

        private By _InputAdress { get { return By.Id("payment-existing"); } }

        private IWebElement InputAdress { get { return WebDriver.FindElementById("payment-existing"); } }


        public IWebElement GetTitle()
        {
            return TitleCkeckOut;
        }

        public IWebElement OrderSuccessfull()
        {
            return TtileOrderSuccessfull;
        }

        private CheckOutPage FillFormBillingDetails(string[] data)
        {
            string[] inputs = { "input-payment-firstname", "input-payment-lastname", "input-payment-address-1", "input-payment-city", "input-payment-postcode" };
            int i = 0;
            foreach (var input in inputs)
            {
                ElementsFormBillingDetails(input).SendKeys(data[i]);
                i++;
            }

            ElementsFormBillingDetails("input-payment-country").Click();
            OptionsCountry(data[i]).Click();
            i++;
            ElementsFormBillingDetails("input-payment-zone").Click();
            OptionsRegion(data[i]).Click();

            return this;
        }

        private CheckOutPage FillFormBillingDetailsAndNewAccount(string[] data)
        {
            string[] inputs = { "input-payment-firstname", "input-payment-lastname", "input-payment-email", "input-payment-telephone", "input-payment-password", "input-payment-confirm", "input-payment-address-1", "input-payment-city", "input-payment-postcode" };
            int i = 0;
            foreach (var input in inputs)
            {
                ElementsFormBillingDetails(input).SendKeys(data[i]);
                i++;
            }

            ElementsFormBillingDetails("input-payment-country").Click();
            OptionsCountry(data[i]).Click();
            i++;
            ElementsFormBillingDetails("input-payment-zone").Click();
            OptionsRegion(data[i]).Click();

            return this;
        }

        public CheckOutPage StepBillingDetailsWithNewAddress(string[] data)
        {
            BtnNewAdress.Click();
            FillFormBillingDetails(data);
            BtnContinueBillingDetails.Click();
            return this;
        }

        public CheckOutPage StepBillingDetails()
        {
            BtnContinueBillingDetails.Click();
            return this;
        }

        public CheckOutPage StepBillingDetailsAndNewAccount(string[] data)
        {
            BtnRegister.Click();
            FillFormBillingDetailsAndNewAccount(data);
            BtnAgree.Click();
            BtnConfirmNewAccount.Click();
            return this;
        }

        public CheckOutPage StepDeliveryDetails()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_InputAdress));
            Assert.True(InputAdress.Displayed, "Input Adress doesn't appear");
            BtnContinueDeliveryDetails.Click();
            return this;
        }

        public CheckOutPage StepDeliveryMethod()
        {
            BtnContinueDeliveryMethod.Click();
            return this;
        }

        public CheckOutPage StepPaymentMethodBankTransfer()
        {
            BtnAgree.Click();
            BtnContinuePaymenMethod.Click();
            return this;
        }

        public CheckOutPage ConfirmOrder() 
        {
            BtnConfirmOrder.Click();
            return this;
        }
    }
}