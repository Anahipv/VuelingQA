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
    public class MyAccountPage : CommonPage

    {
        public MyAccountPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement Success { get { return WebDriver.FindElementByXPath("//ul[@class='breadcrumb']//a[text()='Success']"); } }
        private IWebElement LogOut { get { return WebDriver.FindElementByXPath("//ul[@class='breadcrumb']//a[text()='Logout']"); } }

        public IWebElement GetSuccess()
        {
            return Success;
        }

        public IWebElement GetLogOut() 
        { 
            return LogOut; 
        }
    }
}
