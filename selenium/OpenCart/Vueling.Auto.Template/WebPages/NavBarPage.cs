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
    public class NavBarPage : CommonPage

    {
        public NavBarPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();


        private IWebElement DropDownCart { get { return WebDriver.FindElementById("cart"); } }
        private IWebElement BtnMyAccount { get { return WebDriver.FindElementByXPath("//a[@title='My Account']"); } }
        private IWebElement BtnShoppingCart { get { return WebDriver.FindElementByXPath("//a[@title='Shopping Cart']"); } }
        private IWebElement BtnRegister { get { return WebDriver.FindElementByXPath("//a[text()='Register']"); } }
        private IWebElement BtnLogIn { get { return WebDriver.FindElementByXPath("//a[text()='Login']"); } }
        private IWebElement BtnLogOut { get { return WebDriver.FindElementByXPath("//a[text()='Logout']"); } }
        private IWebElement DropDownContentEmpty { get { return WebDriver.FindElementByXPath("//ul[@class='dropdown-menu pull-right']//p"); } }
        private IWebElement DropDownContent(string name_product) { return WebDriver.FindElementByXPath($"//ul[@class='dropdown-menu pull-right']//a[text()='{name_product}']"); }
        private IWebElement BtnCheckOut { get { return WebDriver.FindElementByXPath("//a[@href='https://opencart.abstracta.us:443/index.php?route=checkout/checkout']"); } }


        public NavBarPage GoToRegister()
        {
            BtnMyAccount.Click();
            BtnRegister.Click();
            return this;
        }
        public NavBarPage GoToLogIn()
        {
            BtnMyAccount.Click();
            BtnLogIn.Click();
            return this;
        }
        public NavBarPage GoToLogOut()
        {
            BtnMyAccount.Click();
            BtnLogOut.Click();
            return this;
        }

        public NavBarPage GoToShoppingCart()
        {
            BtnShoppingCart.Click();
            return this;
        }

        public NavBarPage ClickDropDownCart()
        {
            DropDownCart.Click();
            return this;
        }

        public IWebElement GetContentCartEmpty()
        {
            return DropDownContentEmpty;
        }

        public IWebElement GetContentCart(string name_product)
        {
            return DropDownContent(name_product);
        }

        public NavBarPage GoCheckOut()
        {
            BtnCheckOut.Click();
            return this;
        }
    }
}
