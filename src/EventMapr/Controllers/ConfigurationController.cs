using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text.Json;
using EventMapr.Configuration;

namespace EventMapr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : Controller
    {
        protected Settings Settings { get; }

        public ConfigurationController(IOptions<Settings> settings)
        {
            Settings = settings.Value;
        }

        [HttpGet]
        public IActionResult IndexAsync()
        {
            return Json(Settings, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }
    }
}
