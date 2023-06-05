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
    public class PhonesPage : CommonPage

    {
        public PhonesPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();


        private IWebElement BtnAddToCart { get { return WebDriver.FindElementById("button-cart"); } }
        private IWebElement BtnProduct(string product) { return WebDriver.FindElementByXPath($"//div//a[text()='{product}']"); }
        private IWebElement TitleCategory { get { return WebDriver.FindElementByXPath("//h2[text()='Phones & PDAs']"); } }
        private By _TitleCategory { get { return By.XPath("//h2[text()='Phones & PDAs']"); } }
        private By _TitleProduct(string product) { return By.XPath($"//h1[text()='{product}']"); }
        private IWebElement FirstProduct { get { return WebDriver.FindElementByXPath("(//div[@class='image'])[1]"); } }
        private IWebElement NameFirstProduct { get { return WebDriver.FindElementByXPath("(//div[@class='product-thumb']//a)[2]"); } }
        private IWebElement PriceProduct { get { return WebDriver.FindElementByXPath("//ul//h2"); } }

        private IWebElement RandomProduct(string num) { return WebDriver.FindElementByXPath($"(//div[@class='image'])[{num}]"); } 
        private IWebElement NameRandomProduct(string num) { return WebDriver.FindElementByXPath($"(//div[@class='product-thumb']//a)[{num}]"); } 

        public PhonesPage SelectProduct(string product)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleCategory));
            BtnProduct(product).Click();
            return this;
        }

        public string SelectFirstProduct()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleCategory));
            string name_product = NameFirstProduct.Text;
            FirstProduct.Click();
            return name_product;
        }

        public string SelectRandomProduct()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleCategory));
            Random rnd = new Random();
            int num = rnd.Next(1,4);
            string num_product = num.ToString();
            num = num * 2;
            string num_name = num.ToString();
            string name_product = NameRandomProduct(num_name).Text;
            RandomProduct(num_product).Click();
            return name_product;
        }

        public IWebElement GetTitle()
        {
            return TitleCategory;
        }

        public IWebElement GetPrice()
        {
            return PriceProduct;
        }

        public PhonesPage AddProductToCart(string product)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleProduct(product)));
            BtnAddToCart.Click();
            return this;
        }
    }
}
