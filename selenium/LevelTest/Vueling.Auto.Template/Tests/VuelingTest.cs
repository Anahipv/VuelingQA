using AventStack.ExtentReports;
using NUnit.Framework;
using Level.Template.Common;
using Level.Template.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using Level.Template.SetUp;
using System.Threading;
using System.IO;

namespace Level.Template.Tests
{
    [TestFixture]
    class VuelingTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase()]
        public void SelectFirstDayAvailableTest()
        {
            VuelingPage vuelingPage = new VuelingPage(setUpWebDriver);
            vuelingPage.AcceptCookies();
            vuelingPage.SelectOrigin("BCN");
            vuelingPage.SelectDestination("LGW");
            vuelingPage.SelectFirstDayAvailable("agosto");
        }

        [TestCase()]
        public void RT_2ADT_Test()
        {
            VuelingPage vuelingPage = new VuelingPage(setUpWebDriver);
            vuelingPage.AcceptCookies();
            vuelingPage.SelectOrigin("BCN");
            vuelingPage.SelectDestination("MAD");
            vuelingPage.SelectFirstDayAvailable("agosto");
            vuelingPage.SelectDate_NDaysNextToReturn("20");
            vuelingPage.ClickBtnAdd2ADT();
            vuelingPage.ClickSearch();
        }

        [TestCase()]
        public void OW_1ADT_1INF_BCN_MAD_Test()
        {
            string origin = "BCN";
            string destination = "MAD";
            VuelingPage vuelingPage = new VuelingPage(setUpWebDriver);
            vuelingPage.AcceptCookies();
            Assert.True(vuelingPage.GetSearcher().Displayed, "The searcher doesn't appear");
            vuelingPage.ClickBtnOW();
            vuelingPage.SelectOrigin(origin);
            vuelingPage.SelectDestination(destination);
            vuelingPage.SelectDate_NDaysNextToDeparture("4");
            vuelingPage.AddInfants("1");
            vuelingPage.ClickSearch();
            //Assert.True(vuelingPage.GetTripTitle().Displayed, "The trip title doesn't appear");
            //Assert.True(vuelingPage.GetTripTitle().Text.Contains(origin), "The trip title doesn't contains the airport origin");
            //Assert.True(vuelingPage.GetTripTitle().Text.Contains(destination), "The trip title doesn't contains the airport destination");
        }

        [TestCase()]
        public void RT_5ADT_2CHD_BCN_MAD_Test()
        {
            string origin = "BCN";
            string destination = "MAD";
            VuelingPage vuelingPage = new VuelingPage(setUpWebDriver);
            vuelingPage.AcceptCookies();
            Assert.True(vuelingPage.GetSearcher().Displayed, "The searcher doesn't appear");
            vuelingPage.SelectOrigin(origin);
            vuelingPage.SelectDestination(destination);
            vuelingPage.SelectDate_NDaysNextToDeparture("4");
            vuelingPage.SelectDate_NDaysNextToReturn("3");
            vuelingPage.AddAdults("5");
            vuelingPage.AddChilds("2");
            vuelingPage.ClickSearch();
        }

        [TestCase()]
        public void SignUpTest()
        {
            string name = Helpers.GenerateFirstName(5);
            string last_name = Helpers.GenerateLastName(5);
            string email = name + last_name + "@gmail.com";
            string password = "AbCdEf1928@$";
            string securityQuestion1 = Helpers.GetRandomString(8);
            string securityQuestion2 = Helpers.GetRandomString(6);
            string[] data = { name, last_name, email, password, password, securityQuestion1, securityQuestion2 };

            VuelingPage vuelingPage = new VuelingPage(setUpWebDriver);
            vuelingPage.AcceptCookies();
            vuelingPage.GoToRegister();
            RegisterPage registerPage = new RegisterPage(setUpWebDriver);
            registerPage.RegisterNewAccount(data);
        }
    }
}
