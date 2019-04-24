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
        public async Task DemoAsync(int count = 100, EventClass? eventClass = null)
        {
            var random = new Random(DateTime.Now.Millisecond);

            for (var i = 0; i < count; i++)
            {
                await PostAsync(GetRandomEvent());
                await Task.Delay(random.Next(500));
            }
            
            Event GetRandomEvent()
            {
                var coordinates = Constants.DEMO_COORDINATES.GetRandom();
                var @class = eventClass.HasValue ? (int)eventClass : random.Next(2);

                return new Event
                {
                    SiteId = @class == 1 ? null : Settings.Sites.GetRandom().Name.ToLowerCamelCase(),
                    TypeId = Settings.Types.GetRandom().Key.ToLowerCamelCase(),
                    Latitude = coordinates.Item1,
                    Longitude = coordinates.Item2
                };
            }
        }
    }
}
