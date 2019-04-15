using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using EventMapr.Hubs;
using EventMapr.Models;
using System.Threading.Tasks;

namespace EventMapr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        protected IHubContext<MapHub> HubContext { get; set; }

        public EventController(IHubContext<MapHub> hubContext)
        {
            HubContext = hubContext;
        }

        [HttpPost]
        public async Task PostAsync([FromBody] Event @event)
        {
            await HubContext.Clients.All.SendAsync("ReceiveEvent", @event);
        }
    }
}
