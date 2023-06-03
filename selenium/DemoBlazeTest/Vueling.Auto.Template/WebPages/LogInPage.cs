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
    public class LogInPage : CommonPage

    {
        public LogInPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement InputUserNameLogIn
        {
            get { return WebDriver.FindElementById("loginusername"); }
        }

        private IWebElement InputPasswordLogIn
        {
            get { return WebDriver.FindElementById("loginpassword"); }
        }

        private IWebElement MessageWelcome
        {
            get { return WebDriver.FindElementById("nameofuser"); }
        }

        private By _MessageWelcome
        {
            get { return By.Id("nameofuser"); }
        }

        private IWebElement BtnSendLogIn
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Log in']"); }
        }

        public LogInPage LogIn()
        {
            InputUserNameLogIn.SendKeys("anahi");
            InputPasswordLogIn.SendKeys("anahi");
            BtnSendLogIn.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).
            Until(CustomExpectedConditions.ElementIsVisible(_MessageWelcome));
            Assert.AreEqual("Welcome anahi", MessageWelcome.Text);
            return this;
        }

    }

}
