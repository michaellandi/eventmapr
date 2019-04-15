using System.Collections.Generic;

namespace EventMapr.Configuration
{
    public class Settings
    {
        public Dictionary<string, object> Map { get; set; }
        public Dictionary<string, object> Types { get; set; }
        public Dictionary<string, object>[] Sites { get; set; }
    }


}
