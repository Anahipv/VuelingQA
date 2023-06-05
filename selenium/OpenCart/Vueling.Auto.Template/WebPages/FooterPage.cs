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
    public class FooterPage : CommonPage

    {
        public FooterPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement ContactUs { get { return WebDriver.FindElementByXPath("//a[text()='Contact Us']"); } }

        public FooterPage ClickContactUs()
        {
            ContactUs.Click();
            return this;
        }
    }
}
