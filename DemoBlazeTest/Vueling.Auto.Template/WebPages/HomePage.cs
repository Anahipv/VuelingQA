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
    public class HomePage : CommonPage

    {
        public HomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement BtnLogIn
        {
            get { return WebDriver.FindElementById("login2"); }
        }

        private IWebElement BtnCarouselNext
        {
            get { return WebDriver.FindElementByClassName("carousel-control-next-icon"); }
        }

        private IWebElement BtnHome
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Home ']"); }
        }

        private IWebElement BtnContact
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Contact']"); }
        }

        private IWebElement BtnCart
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Cart']"); }
        }

        //private By getBtnLaptops
        //{
        //    get { return By.XPath("//a[text()='Laptops']"); }
        //}

        //private IWebElement BtnLaptops
        //{
        //    get { return WebDriver.FindElement(getBtnLaptops); }
        //}

        private IWebElement Category(string category)
        {
            return WebDriver.FindElementByXPath("//a[text()='" + category + "']");
        }

        public HomePage CarouselNext()
        {
            //act.MoveToElement(Pagina2).Build().Perform();
            Jse2.ExecuteScript("arguments[0].scrollIntoView()", BtnCarouselNext);
            //Thread.Sleep(1000);
            WebDriverWait wait = new WebDriverWait(WebDriver, TimeSpan.FromSeconds(10));
            wait.Until(CustomExpectedConditions.ElementIsClickable(By.ClassName("carousel-control-next-icon")));
            BtnCarouselNext.Click();
            return this;
        }

        public HomePage ClickContact()
        {
            BtnContact.Click();
            return this;
        }

        public HomePage ClickLogIn()
        {
            BtnLogIn.Click();
            return this;
        }

        public HomePage SelectCategory(string category)
        {
            Category(category).Click();
            return this;
        }

        public HomePage ClickCart()
        {
            BtnCart.Click();
            return this;
        }

        public HomePage ClickHome()
        {
            BtnHome.Click();
            return this;
        }

    }
}
