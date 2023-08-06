using Microsoft.AspNetCore.Mvc;

namespace MVCWebApp.Controllers
{
    public class ReactAppController : Controller
    {
        public IActionResult Index()
        {
            var file = File("~/index.html", "text/html");
            return file;
        }
    }
}
