using EventMapr.Configuration;
using EventMapr.Hubs;
using EventMapr.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace EventMapr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        protected Settings Settings { get; set; }
        protected IHubContext<MapHub> HubContext { get; set; }

        public EventController(IHubContext<MapHub> hubContext,
                               IOptions<Settings> settings)
        {
            HubContext = hubContext;
            Settings = settings.Value;
        }

        [HttpPost]
        public async Task PostAsync([FromBody] Event @event)
        {
            await HubContext.Clients.All.SendAsync("ReceiveEvent", @event);
        }

        [HttpPost("Demo")]
        public async Task DemoAsync(int count = 100)
        {
            var random = new Random(DateTime.Now.Millisecond);

            for (var i = 0; i < count; i++)
            {
                await PostAsync(GetRandomEvent());
                await Task.Delay(random.Next(1000));
            }
            
            Event GetRandomEvent()
            {
                var coordinates = Constants.DEMO_COORDINATES.GetRandom();

                return new Event
                {
                    SiteId = random.Next(2) == 0 ? null : Settings.Sites.GetRandom().Name.ToLowerCamelCase(),
                    TypeId = Settings.Types.GetRandom().Key.ToLowerCamelCase(),
                    Latitude = coordinates.Item1,
                    Longitude = coordinates.Item2
                };
            }
        }
    }
}
