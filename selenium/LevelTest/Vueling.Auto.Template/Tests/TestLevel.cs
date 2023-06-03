using AventStack.ExtentReports;
using NUnit.Framework;
using Level.Template.Common;
using Level.Template.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using Level.Template.SetUp;
using System.Threading;

namespace Level.Template.Tests
{
    [TestFixture]
    class LevelTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase()]
        public void Buy_RT_1ADT_Test()
        {
            LevelHomePage levelHomePage = new LevelHomePage(setUpWebDriver);
            levelHomePage.CloseCookies();
            Thread.Sleep(1000);
            levelHomePage.SelectOrigin("Barcelona");
            Thread.Sleep(1000);
            levelHomePage.SelectDestination("Buenos Aires");
            levelHomePage.SelectDateOrigin("06/06/2023");
            levelHomePage.SelectDateDestination("10/06/2023");
            levelHomePage.ConfirmPax();
            levelHomePage.SubmitSearch();
        }

        [TestCase()]
        public void Buy_OW_BCN_NY_2ADT_1CHD_Test()
        {
            LevelHomePage levelHomePage = new LevelHomePage(setUpWebDriver);
            levelHomePage.CloseCookies();
            Thread.Sleep(1000);
            levelHomePage.SelectOW();
            levelHomePage.SelectOrigin("Barcelona");
            Thread.Sleep(1000);
            levelHomePage.SelectDestination("Nueva York");
            levelHomePage.SelectDateOrigin("23/06/2023");
            string[] passengers = { "adult", "child" };
            // No selecciona los pasajeros y continua con la compra
            levelHomePage.AddPax(passengers);
            levelHomePage.ConfirmPax();
            levelHomePage.SubmitSearch();
        }

        [TestCase()]
        public void Buy_RT_BCN_SCL_3ADT_1CHD_1Infant_Test()
        {
            LevelHomePage levelHomePage = new LevelHomePage(setUpWebDriver);
            levelHomePage.CloseCookies();
            Thread.Sleep(1000);
            levelHomePage.SelectOrigin("Barcelona");
            Thread.Sleep(1000);
            levelHomePage.SelectDestination("Santiago de Chile");
            Thread.Sleep(1000);
            levelHomePage.SelectFirstDayAvailable("Septiembre");
            levelHomePage.SelectReturnDaysAfter(11);
            string[] passengers = { "adult", "adult", "child", "infant" };
            // No selecciona los pasajeros y continua con la compra
            levelHomePage.AddPax(passengers);
            levelHomePage.ConfirmPax();
            levelHomePage.SubmitSearch();
        }
    }
}
