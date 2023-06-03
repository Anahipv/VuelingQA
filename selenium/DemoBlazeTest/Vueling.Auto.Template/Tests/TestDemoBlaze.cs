using AventStack.ExtentReports;
using NUnit.Framework;
using DemoBlaze.Template.Common;
using DemoBlaze.Template.WebPages;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using DemoBlaze.Template.SetUp;

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

        [TestCase()]
        public void E2EBuyPhone()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn();
            homePage.SelectCategory("Phones");
            PhonesPage phonesPage = new PhonesPage(setUpWebDriver);
            phonesPage.ClickProduct("prod.html?idp_=2", "Nokia lumia 1520");
            ProductPage productPage = new ProductPage(setUpWebDriver);
            productPage.ClickAddToCart();
            homePage.ClickCart();
            CartPage cartPage = new CartPage(setUpWebDriver);
            cartPage.ClickPlaceOrder("imgs/Lumia_1520.jpg");
            string[] inputs = { "name", "country", "city", "card", "month", "year" };
            string[] data = { "anahi", "aaa", "bbb", "111222", "diciembre", "2023" };
            cartPage.FillForm(inputs, data);
            cartPage.ClickPurchase("Total: 820");
            cartPage.ClickOk();
        }

        [TestCase()]
        public void E2EBuyMonitor()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn();
            homePage.SelectCategory("Monitors");
            MonitorsPage monitorsPage = new MonitorsPage(setUpWebDriver);
            monitorsPage.ClickProduct("prod.html?idp_=10", "Apple monitor 24");
            ProductPage productPage = new ProductPage(setUpWebDriver);
            productPage.ClickAddToCart();
            homePage.ClickCart();
            CartPage cartPage = new CartPage(setUpWebDriver);
            cartPage.ClickPlaceOrder("imgs/apple_cinema.jpg");
            string[] inputs = { "name", "country", "city", "card", "month", "year" };
            string[] data = { "anahi", "aaa", "bbb", "111222", "diciembre", "2023" };
            cartPage.FillForm(inputs, data);
            cartPage.ClickPurchase("Total: 400");
            cartPage.ClickOk();
        }

        [TestCase()]
        public void ComproveProductsExist()
        {
            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.ClickLogIn();
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn();
            homePage.SelectCategory("Monitors");
            MonitorsPage monitorsPage = new MonitorsPage(setUpWebDriver);
            monitorsPage.ClickProduct("prod.html?idp_=10", "Apple monitor 24");
            ProductPage productPage = new ProductPage(setUpWebDriver);
            productPage.ClickAddToCart();
            homePage.ClickHome();
            homePage.SelectCategory("Laptops");
            LaptopsPage laptopsPage = new LaptopsPage(setUpWebDriver);
            laptopsPage.ClickProduct("prod.html?idp_=11", "MacBook air");
            productPage.ClickAddToCart();
            homePage.ClickCart();
            CartPage cartPage = new CartPage(setUpWebDriver);
            string[] products = { "imgs/apple_cinema.jpg" , "imgs/macbook_air.jpg" };
            cartPage.ProductsExist(products);
        }
    }
}
