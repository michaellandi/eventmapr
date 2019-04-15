using Microsoft.AspNetCore.SignalR;
using EventMapr.Models;
using System.Threading.Tasks;

namespace EventMapr.Hubs
{
    public class MapHub : Hub
    {
        public async Task SendEventAsync(Event @event)
        {
            await Clients.All.SendAsync("ReceiveEvent", @event);
        }
    }
}
