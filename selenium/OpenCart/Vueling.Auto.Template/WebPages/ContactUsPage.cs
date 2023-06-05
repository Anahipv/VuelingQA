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
    public class ContactUsPage : CommonPage

    {
        public ContactUsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement Title { get { return WebDriver.FindElementByXPath("//h1[text()='Contact Us']"); } }
        private IWebElement ElementsForm(string id_element) { return WebDriver.FindElementById($"{id_element}"); }

        private IWebElement BtnSubmit { get { return WebDriver.FindElementByXPath("//input[@value='Submit']"); } }

        private IWebElement BtnContinue { get { return WebDriver.FindElementByXPath("//div[@class='pull-right']"); } }

        public IWebElement GetTitle()
        {
            return Title;
        }

        private ContactUsPage FillFormContactUs(string[] data)
        {
            string[] inputs = { "input-name", "input-email", "input-enquiry" };
            int i = 0;
            foreach (var input in inputs)
            {
                ElementsForm(input).SendKeys(data[i]);
                i++;
            }
            return this;
        }

        public ContactUsPage SendFormForContact()
        {
            string name = Helpers.GenerateFirstName(5);
            string email = name + "@cont.com";
            string enquiry = Helpers.GetRandomString(50);
            string[] data = {name, email, enquiry};
            FillFormContactUs(data);
            BtnSubmit.Click();
            return this;
        }

        public IWebElement GetBtnContinue() 
        {
            return BtnContinue;
        }
    }
}
