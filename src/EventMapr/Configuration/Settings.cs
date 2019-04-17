using EventMapr.Models;
using System.Collections.Generic;

namespace EventMapr.Configuration
{
    public class Settings
    {
        public Dictionary<string, object> Map { get; set; }
        public Dictionary<string, object> Types { get; set; }
        public Site[] Sites { get; set; }
    }
}
