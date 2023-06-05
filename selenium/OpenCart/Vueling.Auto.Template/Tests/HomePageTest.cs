using OpenCart.Common;
using OpenCart.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using OpenCart.SetUp;
using NUnit.Framework;

namespace OpenCart.Tests
{
    [TestFixture]
    class HomePageTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase()]

        public void SponsorExist()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            Assert.AreEqual(homePage.GetSponsor("Nintendo"), true);
        }

        [TestCase()]
        public void CarrouselExist()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            Assert.True(homePage.GetCarrousel().Displayed , "The home page didn't load well");
        }

        [TestCase()]
        public void SearcherExist()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            Assert.True(homePage.GetSearcher().Displayed, "The home page didn't load well");
        }
    }
}
