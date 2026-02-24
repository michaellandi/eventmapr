using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using EventMapr.Configuration;

namespace EventMapr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        protected Settings Settings { get; }

        public ConfigurationController(IOptions<Settings> settings)
        {
            Settings = settings.Value;
        }

        [HttpGet]
        public IActionResult IndexAsync()
        {
            return Ok(Settings);
        }
    }
}
