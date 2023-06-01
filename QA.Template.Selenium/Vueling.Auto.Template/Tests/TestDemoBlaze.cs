using AventStack.ExtentReports;
using NUnit.Framework;
using DemoBlaze.Template.Webpages;
using DemoBlaze.Template.Common;
using DemoBlaze.Template.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;

namespace DemoBlaze.Template.Tests
{
    [TestFixture]
    class DemoBlazeTests : TestSetCleanBase  //descriptivo general
    {
        //[TestCase()]
        //public void ClickCarouselNextTest()
        //{
        //    HomePage homePage = new DemoBlaze.Template.WebPages.HomePage(setUpWebDriver);
        //    homePage.CarouselNext();
        //    homePage.CarouselNext();
        //    homePage.CarouselNext();
        //    homePage.CarouselNext();
        //    homePage.CarouselNext();
        //}

        [TestCase()]
        public void ClickContactTest() 
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickContact();
        }

        [TestCase()]
        public void LogInTest() 
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn();
        }

        [TestCase()]
        public void E2EBuyLaptop() 
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn();
            homePage.SelectCategory("Laptops");
            LaptopsPage laptopsPage = new LaptopsPage(setUpWebDriver);
            laptopsPage.ClickProduct("prod.html?idp_=11", "MacBook air");
            ProductPage productPage = new ProductPage(setUpWebDriver);
            productPage.ClickAddToCart();
            homePage.ClickCart();
            CartPage cartPage = new CartPage(setUpWebDriver); 
            cartPage.ClickPlaceOrder("imgs/macbook_air.jpg");
            string[] inputs = { "name", "country", "city", "card", "month", "year" };
            string[] data = { "anahi", "aaa", "bbb", "111222", "diciembre", "2023" };
            cartPage.FillForm(inputs, data);
            cartPage.ClickPurchase("Total: 700");
            cartPage.ClickOk();
        }
    }
}
