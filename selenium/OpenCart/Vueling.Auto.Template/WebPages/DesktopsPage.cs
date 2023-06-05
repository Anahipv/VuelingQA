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
    public class DesktopsPage : CommonPage

    {
        public DesktopsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();


        private IWebElement BtnAddToCart { get { return WebDriver.FindElementById("button-cart"); } }
        private IWebElement BtnProduct(string product) { return WebDriver.FindElementByXPath($"//div//a[text()='{product}']"); }
        private IWebElement TitleCategory { get { return WebDriver.FindElementByXPath("//h2[text()='Desktops']"); } }
        private By _TitleCategory { get { return By.XPath("//h2[text()='Desktops']"); } }
        private By _TitleProduct(string product) { return By.XPath($"//h1[text()='{product}']"); } 

        public DesktopsPage SelectProduct(string product)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleCategory));
            BtnProduct(product).Click();
            return this;
        }

        public IWebElement GetTitle()
        {
            return TitleCategory;
        }

        public DesktopsPage AddProductToCart(string product) 
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleProduct(product)));
            BtnAddToCart.Click();
            return this;
        }
    }
}
