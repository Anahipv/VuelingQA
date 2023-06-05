using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenCart.SetUp;
using OpenCart.WebPages.Base;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using OpenCart.Common;
using OpenQA.Selenium.Support.UI;
using NUnit.Framework;

namespace OpenCart.WebPages
{
    public class RegisterPage : CommonPage

    {
        public RegisterPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private By _DivAccountRegister { get { return By.Id("account-register"); } }
        private IWebElement DivRegister { get { return WebDriver.FindElementById("account-register"); } }
        private IWebElement ElementsForm(string id_element) { return WebDriver.FindElementById($"{id_element}"); } 
        private IWebElement BtnAgree { get { return WebDriver.FindElementByXPath("//input[@name='agree']"); } }
        private IWebElement BtnSubmit { get { return WebDriver.FindElementByXPath("//input[@type='submit']"); } }

        private RegisterPage FillFormRegister(string[] data)
        {
            string[] inputs = { "input-firstname", "input-lastname", "input-email", "input-telephone", "input-password", "input-confirm" };
            int i = 0;
            foreach(var input in inputs)
            {
                ElementsForm(input).SendKeys(data[i]);
                i++;
            }
            return this;
        }
        public RegisterPage RegisterNewAccount(string[] data) 
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_DivAccountRegister));
            FillFormRegister(data);
            BtnAgree.Click();
            BtnSubmit.Click();
            return this;
        }
        public IWebElement GetDivRegister()
        {
            return DivRegister;
        }

    }
}