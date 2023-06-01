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
using System.Diagnostics.Eventing.Reader;

namespace DemoBlaze.Template.WebPages
{
    public class CartPage : CommonPage

    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement BtnPlaceOrder
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Place Order']"); }
        }

        private IWebElement BtnPurchase
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Purchase']"); }
        }

        private IWebElement BtnOk
        {
            get { return WebDriver.FindElementByXPath("//button[text()='OK']"); }
        }

        private IWebElement ElementsForm(string input)
        {
            return WebDriver.FindElementById(input); 
        }

        private IWebElement TotalCart
        {
            get { return WebDriver.FindElementById("totalm"); }
        }

        private IWebElement ImageProduct(string img)
        {
            return WebDriver.FindElementByCssSelector("img[src='" + img + "']");
        }

        public CartPage ClickPlaceOrder(string img) 
        {
            Assert.IsTrue(ImageProduct(img).Displayed, "La imagen no aparece");
            BtnPlaceOrder.Click();
            return this;
        }

        public CartPage FillForm(string[] inputs, string[] data)
        {
            int i = 0;
            foreach (var elm in data)
            {
                ElementsForm(inputs[i]).SendKeys(elm);
                i++;
            }
            return this;
        }

        public CartPage ClickPurchase(string price)
        {
            Assert.AreEqual(price, TotalCart.Text);
            BtnPurchase.Click();
            return this;
        }

        public CartPage ClickOk()
        {
            BtnOk.Click();
            return this;
        }
    }
}
