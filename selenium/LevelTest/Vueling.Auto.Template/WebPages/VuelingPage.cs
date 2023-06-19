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
using System.Runtime.InteropServices;

namespace Level.Template.WebPages
{
    public class VuelingPage : CommonPage

    {
        public VuelingPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();



        private IWebElement DivSearcher { get { return WebDriver.FindElementById("buscador"); } }
        private IWebElement BtnCalendarDateDeparture { get { return WebDriver.FindElementById("marketDate1"); } }
        private IWebElement DropDownOrigin { get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"); } }
        private IWebElement BtnAcceptcookies { get { return WebDriver.FindElementById("onetrust-accept-btn-handler"); } }
        private By _BtnAcceptcookies { get { return By.Id("onetrust-accept-btn-handler"); } }
        private IWebElement DropDownDestination { get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketDestination1"); } }
        private IWebElement DropDownInfants { get { return WebDriver.FindElementById("container_AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"); } }
        private IWebElement BtnAdd2ADT { get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_2"); } }
        private IWebElement BtnAdd3ADT { get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_3"); } }
        private IWebElement BtnSearch { get { return WebDriver.FindElementById("divButtonBuscadorNormal"); } }
        private IWebElement DivCalendar { get { return WebDriver.FindElementById("ui-datepicker-div"); } }
        private IWebElement DropDownAdults { get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_PLUS"); } }
        private IWebElement DropDownCHD { get { return WebDriver.FindElementById("container_AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD"); } }
        private By _DivCalendar { get { return By.Id(
            //"ui-datepicker-div"
            "datePickerContainer"
            ); } }
        private By _TitleDatePicker(string titulo) { return By.XPath($"//span[text()='{titulo}']"); } 
        private IList<IWebElement> Prices { get { return WebDriver.FindElementsByCssSelector("#justPrice span"); } }
        private IWebElement TripTitle { get { return WebDriver.FindElementByClassName(".vy-journey_header_title"); } }
        private IWebElement AddADT(string adt) { return WebDriver.FindElementByCssSelector($"#adtSelectorDropdown option[value='{adt}']"); } 
        //private IWebElement AddPassenger(string passenger) { return WebDriver.FindElementByXPath($"//option[@value='{passenger}']"); }
        private IWebElement AddCHD(string chd) { return WebDriver.FindElementByCssSelector($"#AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD option[value='{chd}']"); }
        private IWebElement AddINF(string inf) { return WebDriver.FindElementByCssSelector($"#AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT option[value='{inf}']"); }
        private IWebElement SelectFlyByPosition(string position) { return WebDriver.FindElementByXPath("(//span[@id='justPrice'])"); }
        private IWebElement BtnSignUp { get { return WebDriver.FindElementByXPath("//a[@class='optionRegister login-menu']"); } }
        private IWebElement BtnSignUp2 { get { return WebDriver.FindElementByXPath("//a[@class='mv_button icon icon-right']"); } }
        private IWebElement MonthTitle { get { return WebDriver.FindElementByXPath("(//span[@class='ui-datepicker-month'])[1]"); } }
        private IWebElement BtnNextMonth { get { return WebDriver.FindElementByXPath("//a[@data-handler='next']"); } }
        private IWebElement FirstDayAvailable { get { return WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])[1]"); } }
        private IWebElement NDayAvailableNext(string day) { return WebDriver.FindElementByXPath($"(//td[@data-handler='selectDay'])[{day}]"); }
        private IWebElement SelectAirport(string airport) { return WebDriver.FindElementByXPath($"//a[@data-id-code='{airport}']"); }
        private IWebElement BtnOW { get { return WebDriver.FindElementByXPath("//label[@for='AvailabilitySearchInputSearchView_OneWay']"); } }


        public IWebElement GetSearcher()
        {
            return DivSearcher;
        }

        public VuelingPage SelectFirstDayAvailable(string month)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_DivCalendar));
            month = month.ToLower();
            //BtnCalendarDateDeparture.Click();
            while (!month.Equals(MonthTitle.Text))
            {
                BtnNextMonth.Click();
            }
            FirstDayAvailable.Click();
            return this;
        }

        public VuelingPage AcceptCookies()
        {
            //new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            //.Until(CustomExpectedConditions.ElementIsVisible(_BtnAcceptcookies));
            BtnAcceptcookies.Click();
            return this;
        }

        public VuelingPage SelectOrigin(string origin)
        {
            DropDownOrigin.Click();
            SelectAirport(origin).Click(); 
            return this;
        }

        public VuelingPage SelectDestination(string destination)
        {
            DropDownDestination.Click();
            SelectAirport(destination).Click();
            return this;
        }

        public VuelingPage GoToRegister()
        {
            BtnSignUp.Click();
            BtnSignUp2.Click();
            return this;
        }

        public VuelingPage ClickBtnOW()
        {
            BtnOW.Click();
            return this;
        }

        public VuelingPage SelectDate_NDaysNextToDeparture(string day)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_DivCalendar));
            NDayAvailableNext(day).Click();
            return this;
        }

        public VuelingPage SelectDate_NDaysNextToReturn(string day)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout))
            .Until(CustomExpectedConditions.ElementIsVisible(_TitleDatePicker("Fecha de vuelta")));
            NDayAvailableNext(day).Click();
            return this;
        }

        public VuelingPage AddInfants(string infants)
        {
            DropDownInfants.Click();
            AddINF(infants).Click();
            return this;
        }

        public VuelingPage AddChilds(string childs)
        {
            DropDownCHD.Click();
            AddCHD(childs).Click();
            return this;
        }

        public VuelingPage ClickBtnAdd2ADT()
        {
            BtnAdd2ADT.Click();
            return this;
        }

        public VuelingPage ClickBtnAdd3ADT()
        {
            BtnAdd3ADT.Click();
            return this;
        }

        public VuelingPage AddAdults(string adults)
        {
            DropDownAdults.Click();
            AddADT(adults).Click();
            return this;
        }

        public VuelingPage ClickSearch()
        {
            BtnSearch.Click();
            return this;
        }

        public IWebElement GetTripTitle()
        {
            return TripTitle;
        }

        private string[] GetPrices()
        {
            string[] prices = { };
            string actual_price = "";
            for (int i = 1; i <= Prices.Count; i++)
            {
                if (i % 2 != 0)
                {
                    actual_price = "";
                    actual_price += Prices[i].Text;
                }
                else
                {
                    actual_price= Prices[i].Text;
                    prices.Append(actual_price);
                }
            }
            return prices;
        }

    }
}
