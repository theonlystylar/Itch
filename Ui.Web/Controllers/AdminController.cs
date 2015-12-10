using Microsoft.AspNet.Mvc;

namespace Ui.Web.Controllers
{
	public class AdminController : Controller
	{
		// GET: /<controller>/
		public IActionResult Index()
		{
			return View();
		}
	}
}