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
    class OpenCartTests : TestSetCleanBase  //descriptivo general
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
        public void TryBuyAC3_WithoutFillOptions_Test()
        {
            string category = "Desktops";
            string product = "Apple Cinema 30\"";

            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            CategoriesPage categoriesPage = new CategoriesPage(setUpWebDriver);
            categoriesPage.ClickCategory(category);
            categoriesPage.ClickAllDesktops();
            DesktopsPage desktopsPage = new DesktopsPage(setUpWebDriver);
            Assert.AreEqual(desktopsPage.GetTitle().Text, category);
            desktopsPage.SelectProduct(product);
            desktopsPage.AddProductToCart(product);
            NavBarPage navBarPage = new NavBarPage(setUpWebDriver);
            navBarPage.ClickDropDownCart();
            Assert.AreEqual(navBarPage.GetContentCartEmpty().Text, "Your shopping cart is empty!");
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

        [TestCase()]
        public void BuyFirstTablet_WithoutPreviuosLogIn_Test()
        {
            string category = "Tablets";
            string[] data_login = { "aaaa@bbb.com", "aaabbb" };

            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            CategoriesPage categoriesPage = new CategoriesPage(setUpWebDriver);
            categoriesPage.ClickCategory(category);
            TabletsPage tabletsPage = new TabletsPage(setUpWebDriver);
            Assert.AreEqual(tabletsPage.GetTitle().Text, category);
            string product_name = tabletsPage.SelectFirstProduct();
            string product_price = tabletsPage.GetPrice().Text;
            tabletsPage.AddProductToCart(product_name);
            NavBarPage navBarPage = new NavBarPage(setUpWebDriver);
            navBarPage.GoToShoppingCart();
            CartPage cartPage = new CartPage(setUpWebDriver);
            //Assert.True(cartPage.GetProductName(product_name).Displayed, $"Don't appear a product with this name: {product_name}");
            //Assert.True(cartPage.GetProductPrice(product_price).Displayed, $"Don't appear a product with this price: {product_price}");
            cartPage.ClickCheckOut();
            CheckOutPage checkOutPage = new CheckOutPage(setUpWebDriver);
            Assert.AreEqual(checkOutPage.GetTitle().Text, "Checkout");
            LogInPage logInPage = new LogInPage(setUpWebDriver);
            logInPage.LogIn(data_login);
            checkOutPage.StepBillingDetails();
            checkOutPage.StepDeliveryDetails();
            checkOutPage.StepDeliveryMethod();
            checkOutPage.StepPaymentMethodBankTransfer();
            checkOutPage.ConfirmOrder();
            Assert.IsTrue(checkOutPage.OrderSuccessfull().Displayed, "The oreder wasn't successfull");
        }

        [TestCase()]
        public void BuyRandomPhone_WithoutPreviuosRegister_Test()
        {
            string category = "Phones & PDAs";
            string name = Helpers.GenerateFirstName(5);
            string last_name = Helpers.GenerateLastName(5);
            string email = name + "@mail.com";
            string telephone = Helpers.GetRandomPhoneNumber().ToString();
            string password = Helpers.GetRandomString(8);
            string adress = Helpers.GetRandomString(8);
            string city = Helpers.GetRandomString(5);
            string post_code = Helpers.GetRandomString(8);
            string country = "Argentina";
            string region = "Buenos Aires";
            string[] data_register = { name, last_name, email, telephone, password, password, adress, city, post_code, country, region };

            HomePage homePage = new HomePage(setUpWebDriver);
            homePage.SkipCertValidation();
            CategoriesPage categoriesPage = new CategoriesPage(setUpWebDriver);
            categoriesPage.ClickCategory(category);
            PhonesPage phonesPage = new PhonesPage(setUpWebDriver);
            Assert.AreEqual(phonesPage.GetTitle().Text, category);
            string product_name = phonesPage.SelectRandomProduct();
            string product_price = phonesPage.GetPrice().Text;
            phonesPage.AddProductToCart(product_name);
            NavBarPage navBarPage = new NavBarPage(setUpWebDriver);
            navBarPage.ClickDropDownCart();
            Assert.True(navBarPage.GetContentCart(product_name).Displayed, $"Don't appear a product with this price: {product_name}");
            navBarPage.GoCheckOut();
            CheckOutPage checkOutPage = new CheckOutPage(setUpWebDriver);
            Assert.AreEqual(checkOutPage.GetTitle().Text, "Checkout");
            checkOutPage.StepBillingDetailsAndNewAccount(data_register);
            checkOutPage.StepDeliveryDetails();
            checkOutPage.StepDeliveryMethod();
            checkOutPage.StepPaymentMethodBankTransfer();
            checkOutPage.ConfirmOrder();
            Assert.IsTrue(checkOutPage.OrderSuccessfull().Displayed, "The oreder wasn't successfull");
        }

    }
}
