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
    public class RegisterPage : CommonPage

    {
        public RegisterPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver) { }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement FormElement (string id) { return WebDriver.FindElementById(id); }

        private IWebElement FormSecurityQuestion(string id) { return WebDriver.FindElementById(id); }

        private IWebElement BtnAgreeConditions { get { return 
                    //WebDriver.FindElementByXPath("//input[@id='CONTROLGROUPREGISTERVIEW_LegalConditionsCheckbox']"
                    WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_LegalConditionsCheckbox")
                    ; } }

        private IWebElement OptionsSecurutyQuestion(string value) { return WebDriver.FindElementByXPath($"//option[@value='{value}']"); }

        private RegisterPage FillRegisterForm(string[] data)
        {
            string[] inputs = { "CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxFirstName", 
                                "CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxLastName", 
                                "CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxEmail", 
                                "CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldAgentPassword", 
                                "CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldPasswordConfirm" };
            int i = 0;
            foreach (string input in inputs)
            {
                FormElement(input).SendKeys(data[i]);
                i++;
            }
            Random rnd = new Random();

            FormSecurityQuestion("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_FirstQuestion").Click();
            int value = rnd.Next(2, 13);
            OptionsSecurutyQuestion(value.ToString());
            FormElement("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_FirstAnswer").SendKeys(data[i]);
            i++;

            FormSecurityQuestion("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_SecondQuestion").Click();
            value = rnd.Next(2, 13);
            OptionsSecurutyQuestion(value.ToString());
            FormElement("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_SecondAnswer").SendKeys(data[i]);
            return this;
        }

        public RegisterPage RegisterNewAccount(string[] data)
        {
            FillRegisterForm(data);
            //BtnAgreeConditions.Click();
            Jse2.ExecuteScript("arguments[0].click();", BtnAgreeConditions);
            return this;
        }
    }
}
