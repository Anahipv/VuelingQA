using OpenQA.Selenium;
using System;
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

namespace OpenCart.WebPages
{
    public class HomePage : CommonPage

    {
        public HomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) {}

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();


        private IWebElement BtnCongAvanzada { get { return WebDriver.FindElementById("details-button"); } }
        private IWebElement BtnAccederOpenCart { get { return WebDriver.FindElementById("proceed-link"); } }
        private IWebElement Sponsor(string name) { return WebDriver.FindElementByXPath($"//img[@alt='{name}']"); }
        private IWebElement Carrousel { get { return WebDriver.FindElementById("slideshow0"); } }
        private IWebElement Searcher { get { return WebDriver.FindElementById("search"); } }


        public HomePage SkipCertValidation()
        {
            BtnCongAvanzada.Click();
            BtnAccederOpenCart.Click();
            return this;
        }

        public Boolean GetSponsor(string sponsor)
        {
            try
            {
                Sponsor(sponsor);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IWebElement GetCarrousel()
        {
            return Carrousel;
        }

        public IWebElement GetSearcher()
        {
            return Searcher;
        }
    }
}
