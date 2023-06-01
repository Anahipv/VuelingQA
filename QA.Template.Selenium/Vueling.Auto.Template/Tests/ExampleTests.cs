using AventStack.ExtentReports;
using NUnit.Framework;
using DemoBlaze.Template.Webpages;

namespace DemoBlaze.Template.Tests
{
    [TestFixture]
    class ExampleTests : TestSetCleanBase  //descriptivo general
    {
        [TestCase(1)]
        public void ExampleTest(int scenario) // descriptivo especifico por test case
        {
            googlePage = new GooglePage(setUpWebDriver);
            test.Log(Status.Debug, "Entra en Google."); // esto sale en el report, no en la consola
            string search1 = objectsTest.CallCase1FromScenarioTestXml(scenario);
            string search2 = objectsTest.CallCase2FromScenarioTestXml(scenario);
            googlePage.Busqueda(search1, search2);
            test.Log(Status.Info, "Hace busqueda.");

            googleSearch = new GoogleSearch(setUpWebDriver);
            //test.Log(Status.Fail, "Cambio de pagina.");
            googleSearch.SiguientePagina();
            googleSearch.SeleccionarLink(0);
            //test.Log(Status.Fatal, "No se que poner.");
            test.Log(Status.Pass, "Fin del test.");
        }
    }

}
