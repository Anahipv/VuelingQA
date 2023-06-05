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
    class AccountTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase()]
        public void RegisterNewAccount_Test()
        {
            string name = Helpers.GenerateFirstName(5);
            string last_name = Helpers.GenerateLastName(5);
            string email = name + "@mail.com";
            string telephone = Helpers.GetRandomPhoneNumber().ToString();
            string password = Helpers.GetRandomString(8);
            string[] data = { name, last_name, email, telephone, password, password };

            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            NavBarPage navBarPage = new NavBarPage(setUpWebDriver);
            navBarPage.GoToRegister();
            RegisterPage registerPage = new RegisterPage(setUpWebDriver);
            Assert.IsTrue(registerPage.GetDivRegister().Displayed, "Div for the register doesn't appear");
            registerPage.RegisterNewAccount(data);
            MyAccountPage myAccountPage = new MyAccountPage(setUpWebDriver);
            Assert.IsTrue(myAccountPage.GetSuccess().Displayed, "The register wasn't successful");
        }

        [TestCase()]
        public void LogIn_And_LogOut_Test()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            NavBarPage navBarPage = new NavBarPage(setUpWebDriver);
            navBarPage.GoToLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            Assert.IsTrue(logInPage.GetDivLogIn().Displayed, "Div for the Log In doesn't appear");
            string[] data = { "aaaa@bbb.com", "aaabbb" };
            logInPage.LogIn(data);
            navBarPage.GoToLogOut();
            MyAccountPage myAccountPage = new MyAccountPage(setUpWebDriver);
            Assert.IsTrue(myAccountPage.GetLogOut().Displayed, "The log out wasn't successful");

        }
    }
}