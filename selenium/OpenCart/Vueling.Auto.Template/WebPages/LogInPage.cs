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
using OpenQA.Selenium;
using System;

namespace OpenCart.WebPages
{
    public class LogInPage : CommonPage

    {
        public LogInPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement ElementsForm(string id_element) { return WebDriver.FindElementById($"{id_element}"); }
        private By _DivLogIn { get { return By.XPath("//h2[text()='Returning Customer']"); } }
        private IWebElement DivLogIn { get { return WebDriver.FindElementByXPath("//h2[text()='Returning Customer']"); } }
        private IWebElement BtnLogIn { get { return WebDriver.FindElementByXPath("//input[@value='Login']"); } }


        private LogInPage FillFormLogIn(string[] data)
        {
            string[] inputs = { "input-email", "input-password"};
            int i = 0;
            foreach (var input in inputs)
            {
                ElementsForm(input).SendKeys(data[i]);
                i++;
            }
            return this;
        }
        public LogInPage LogIn(string[] data)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_DivLogIn));
            FillFormLogIn(data);
            BtnLogIn.Click();
            return this;
        }
        public IWebElement GetDivLogIn()
        {
            return DivLogIn;
        }
    }
}
