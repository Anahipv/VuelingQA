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
    public class ProductPage : CommonPage

    {
        public ProductPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement BtnAddToCart
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Add to cart']"); }
        }

        public ProductPage ClickAddToCart()
        {
            BtnAddToCart.Click();
            return this;
        }

    }
}
