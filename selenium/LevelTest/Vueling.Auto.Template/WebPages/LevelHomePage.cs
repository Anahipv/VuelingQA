using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Level.Template.SetUp;
using Level.Template.WebPages.Base;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using Level.Template.Common;
using OpenQA.Selenium.Support.UI;
using NUnit.Framework;
using System.Threading;
using System.Globalization;

namespace Level.Template.WebPages
{
    public class LevelHomePage : CommonPage

    {
        public LevelHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) {}

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement BtnSubmitSearch { get { return WebDriver.FindElementById("searcher_submit_buttons"); } }
        private IWebElement Searcher { get { return WebDriver.FindElementById("searcher-block"); } }
        private IWebElement ListOfDestination { get { return WebDriver.FindElementByClassName("list-items origin js-list-items"); } }
        private By _ListOfOrigin { get { return By.XPath("//dev[@class='list-items origin js-list-items']"); } }
        private By _ListOfDestination { get { return By.ClassName("list-items destination js-list-items"); } }
        private IWebElement Origin { get { return WebDriver.FindElementByCssSelector("div[data-field='origin']"); } }
        private IWebElement Destination { get { return WebDriver.FindElementByCssSelector("div[data-field='destination']"); } }
        private IWebElement Date(string date) { return WebDriver.FindElementByCssSelector("div[data-time='" + date + "']"); }
        private IWebElement SelectCity(string city, int i) { return WebDriver.FindElementByXPath("(//div[@class='city' and text()='" + city + "'])[" + i + "]"); }
        private IWebElement InputDepartureDate { get { return WebDriver.FindElementByXPath("(//div[@class='departure-date']/p[@class='input-value' and @data-placeholder='Elige una fecha'])[1]"); } }      
        private IWebElement InputReturnDate { get { return WebDriver.FindElementByXPath("//div[@class='searcher-input arrival-date-input js-arrival-date col s6 focused']/p[@class = 'input-value placeholder']"); } }
        private IWebElement BtnConfirmPax { get { return WebDriver.FindElementByXPath("//div[@class='pax-selector-footer pax-selector-filter']/button"); } }
        private IWebElement BtnDropDownTrip { get { return WebDriver.FindElementByXPath("//a[@data-target='dropdown-trip']"); } }
        private IWebElement BtnOW { get { return WebDriver.FindElementByXPath("//a[@value='OW']"); } }
        private IWebElement BtnDropDownPax { get { return WebDriver.FindElementByXPath("//div[@data-type='paxes' and @role='button']"); } }
        private IWebElement BtnAddPax(string pax) { return WebDriver.FindElementByXPath("" +
            //"//div[@data-field='" + pax + "']//span[@class='icon-plus pax-icon']"
            "//div[@data-field='" + pax + "']//div[@class='js-plus']"); }
        private IWebElement BtnNextMonth { get { return WebDriver.FindElementByXPath("//button[@class='datepicker__next-action js-month-change']"); } }
        private IWebElement MonthTitle { get { return WebDriver.FindElementByXPath("(//div[@class='datepicker__month-title']/span[@class='month'])[1]"); } }
        private IWebElement FirstDayAvailable { get { return WebDriver.FindElementByXPath("((//div[@class='datepicker__months']/section[1]//div[@class='datepicker__day is-available '])[1])"); } }
        private IWebElement Day(string day) { return WebDriver.FindElementByXPath("//div[@class='day' and text()='" + day + "']"); }


        public LevelHomePage SelectOrigin(string city_origin)
        {
            Origin.Click();
            //new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            //.Until(CustomExpectedConditions.ElementIsVisible(_ListOfOrigin));
            SelectCity(city_origin, 1).Click();
            return this;
        }

        public LevelHomePage SelectDestination(string city_detination)
        {
            Destination.Click();
            //new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            //.Until(CustomExpectedConditions.ElementIsVisible(_ListOfDestination));
            SelectCity(city_detination, 2).Click();
            return this;
        }

        public LevelHomePage CloseCookies() 
        {
            WebDriver.FindElement(By.Id("ensCloseBanner")).Click();
            return this;
        }

        private long ParseDateToMiliseconds(string date_string)
        {
            DateTime date = DateTime.ParseExact(date_string, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            long dateToMiliseconds = (long)(date - new DateTime(1970, 1, 1)).TotalMilliseconds;      
            long dosHoras = 7200000;
            dateToMiliseconds -= dosHoras;

            return dateToMiliseconds;
        }

        public LevelHomePage SelectDateOrigin(string date_origin)
        {
            //InputDepartureDate.Click();
            string date = ParseDateToMiliseconds(date_origin).ToString();
            Date(date).Click(); 
            return this;   
        }

        public LevelHomePage SelectDateDestination(string date_destination)
        {
            //InputReturnDate.Click();
            string date = ParseDateToMiliseconds(date_destination).ToString();
            Date(date).Click();
            return this;
        }

        public LevelHomePage ConfirmPax() 
        { 
            BtnConfirmPax.Click();
            return this; 
        }

        public LevelHomePage SubmitSearch()
        {
            BtnSubmitSearch.Click();
            return this;
        }

        public LevelHomePage SelectOW()
        {
            BtnDropDownTrip.Click();
            BtnOW.Click();
            return this;   
        }

        public LevelHomePage AddPax(string[] paxs)
        {
            BtnDropDownPax.Click();
            foreach (var pax in paxs)
            {
                Thread.Sleep(1000);
                BtnAddPax(pax);
                Thread.Sleep(1000);
            } 
            return this;
        }

        public LevelHomePage SelectFirstDayAvailable(string month)
        {
            month = month.ToUpper();
            while (! month.Equals(MonthTitle.Text))
            {
                BtnNextMonth.Click();
            }
            Thread.Sleep(1000);
            FirstDayAvailable.Click();
            return this;
        }

        public LevelHomePage SelectReturnDaysAfter(int days)
        {
            string departure_day = InputDepartureDate.Text;
            string[] departure_day_array = departure_day.Split(' ');
            int departure_day_int = Int32.Parse(departure_day_array[1]);
            int return_day = departure_day_int + days;
            string return_day_str = return_day.ToString();
            Day(return_day_str).Click();
            return this;  
        }

        public IWebElement GetSearcher()
        {
            return Searcher;
        }
    }
}

