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
            Assert.True(homePage.GetSponsor("Nintendo").Displayed, "This sponsor doesn't exist");
        }
    }
}
