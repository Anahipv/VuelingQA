using AventStack.ExtentReports;
using NUnit.Framework;
using OpenCart.Common;
using OpenCart.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using OpenCart.SetUp;

namespace OpenCart.Tests
{
    [TestFixture]
    class OpenCartCustomerServiceTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase()]

        public void ContactUsTest()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            FooterPage footerPage = new FooterPage(setUpWebDriver);
            footerPage.ClickContactUs();
            ContactUsPage contactUsPage = new ContactUsPage(setUpWebDriver);
            Assert.True(contactUsPage.GetTitle().Displayed, "It's the correct page");
            contactUsPage.SendFormForContact();
            Assert.True(contactUsPage.GetBtnContinue().Displayed, "The message wasn't sent");
        }
    }
}
