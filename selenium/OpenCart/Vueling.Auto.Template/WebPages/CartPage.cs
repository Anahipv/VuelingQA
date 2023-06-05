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
    public class CartPage : CommonPage

    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement ProductName(string product) { return WebDriver.FindElementByXPath($"//a[text()='{product}']"); }

        private IWebElement ProductPrice(string price) { return WebDriver.FindElementByXPath($"//td[@class='text-right' and text()='{price}']"); }
    
        private IWebElement BtnCheckOut { get { return WebDriver.FindElementByXPath("//a[text()='Checkout']"); } }
    
        public IWebElement GetProductName(string product)
        {
            return ProductName(product);
        }

        public IWebElement GetProductPrice(string price)
        {
            return ProductPrice(price);
        }

        public CartPage ClickCheckOut()
        {
            BtnCheckOut.Click();
            return this;
        }
    }
}
