using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DemoBlaze.Template.SetUp;
using DemoBlaze.Template.WebPages.Base;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using DemoBlaze.Template.Common;
using OpenQA.Selenium.Support.UI;
using NUnit.Framework;

namespace DemoBlaze.Template.WebPages
{
    public class LaptopsPage : CommonPage

    {
        public LaptopsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement Product(string product)
        {
            return WebDriver.FindElementByCssSelector("a[href='" +  product + "']");
            //get { return WebDriver.FindElementByXPath("//a[text()='MacBook air']"); }
        }

        private IWebElement LaptopName
        {
            get { return WebDriver.FindElementByCssSelector(".name"); }
        }

        private By _LaptopName
        {
            get { return By.CssSelector(".name"); }
        }

        public LaptopsPage ClickProduct(string product, string name_laptop)
        {
            Product(product).Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).
            Until(CustomExpectedConditions.ElementIsVisible(_LaptopName));
            Assert.AreEqual(name_laptop, LaptopName.Text);
            return this;
        }

    }
}