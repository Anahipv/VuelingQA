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
    public class CategoriesPage : CommonPage

    {
        public CategoriesPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement BtnCategories(string category) { return WebDriver.FindElementByXPath($"//a[text()='{category}']"); }
        private IWebElement BtnShowAllDesktops { get { return WebDriver.FindElementByXPath("//a[text()='Show All Desktops']"); } }

        public CategoriesPage ClickCategory(string category)
        {
            BtnCategories(category).Click();
            return this;  
        }

        public CategoriesPage ClickAllDesktops()
        {
            BtnCategories("Desktops").Click();
            BtnShowAllDesktops.Click();
            return this;
        }
    }
}

