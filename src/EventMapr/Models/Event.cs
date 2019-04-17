namespace EventMapr.Models
{
    public class Event
    {
        public string SiteId { get; set; }
        public string TypeId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public Event() { }

        public Event(string siteId, string typeId, float latitude, float longitude)
        {
            SiteId = siteId;
            TypeId = typeId;
            Latitude = latitude;
            Longitude = longitude;
        }
    }
}
