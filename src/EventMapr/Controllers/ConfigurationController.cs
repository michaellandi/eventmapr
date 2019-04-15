using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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
            return Json(Settings, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}