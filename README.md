# EventMapr

## What is EventMapr?
EventMapr is a tool for displaying real-time eventing data on a map.  It consists of a map front-end, powered by MapBox (https://www.mapbox.com/), and a back-end API which can be used to push event-data to the map.

![Event Map](https://github.com/michaellandi/eventmapr/raw/master/docs/map-all.gif)

## Event Types
EventMapr works by pushing events from a back-end API to a front-end map.  EventMapr supports two types of events:
 - Line Events: events originating at a geo-point and going to a site (or data center)
 - Marker Events: events originating at a geo-point

The back-end API is viewable in swagger at `/swagger`.

### Line Event
Line Events can be created by calling the `event` API while passing in a `site`, `event type`, `latitude` and `longitude`.  The API call will draw a line from the geo-point specified to the given site.  The line will be visible for the `LineDuration` interval specified in configuration.

Example CURL:
```
curl -XPOST http://localhost:5000/api/event -H "content-type:application/json" -d '{"siteId":"ny","typeId":"event1","latitude":40.7608,"longitude":-111.8910}'
```
Example Map:
![Line Event Map](https://github.com/michaellandi/eventmapr/raw/master/docs/map-line.gif)

### Marker Event
Marker Events can be created the same way as Line Events with the difference that the `site` is left empty.  A Marker Event will draw a circular pattern around the `latitude` and `longitude` selected.  The Marker will be visible for the `MarkerDuration` interval specified in the configuration.

Example CURL:
```
curl -XPOST http://localhost:5000/api/event -H "content-type:application/json" -d '{"typeId":"event1","latitude":40.7608,"longitude":-111.8910}'
```

Example Map:
![Marker Event Map](https://github.com/michaellandi/eventmapr/raw/master/docs/map-marker.gif)

## Running from Source
EventMapr can be run from source using the [dotnet core 2.2 sdk](https://dotnet.microsoft.com/download/dotnet-core/2.2):
```
cd src/EventMapr
dotnet run
```

## Running from Docker
EventMapr can be run from the hosted docker image `michaellandi/eventmapr`.  It is recommended that you map a configuration file to the container instance to override the supplied configuration.  EventMapr will automatically load any configuration file specified by the `EVENTMAPR_CONFIG_PATH` environment variable.

By default EventMapr will host itself on port 5000 within the container.

```
docker run -d -e EVENTMAPR_CONFIG_PATH=/etc/eventmapr/eventmapr.json -v ~/eventmapr/:/etc/eventmapr -p 5000:5000 michaellandi/eventmapr:latest
```

## Configuration
Many configuration options are available and can be overridden.  See the default configuration file hosted (here)[https://github.com/michaellandi/eventmapr/blob/master/src/EventMapr/appsettings.json]

*NOTE*: You will need to replace the `ApiKey` setting with your API key from Mapbox.
```
{
  "Settings": {
    "Map": {
      "LineDuration": 3000,

      "MarkerDuration": 10000,
      "MarkerHeight": 12,
      "MarkerWidth": 12,

      "Theme": "mapbox://styles/mapbox/dark-v10",
      "DivId": "map",
      "CenterLatitude": 39.8333333,
      "CenterLongitude": -98.585522,
      "Zoom": "3.5",
      "ApiKey": "{{MAPBOX_API_KEY}}",
      "LegendTitle": "Event Type",

      "SiteIcon": "img/marker.png",
      "SiteHeight": 40,
      "SiteWidth": 20
    },
    "Types": {
      "Event1": "#13B2A6",
      "Event2": "#A67657",
      "Event3": "#CEE4AC"
    },
    "Sites": [
      {
        "Name": "ny",
        "Latitude": 40.7167,
        "Longitude": -74
      },
      {
        "Name": "ch",
        "Latitude": 41.881832,
        "Longitude": -87.623177
      },
      {
        "Name": "sf",
        "Latitude": 37.774929,
        "Longitude": -122.419416
      }
    ]
  }
}

```

## License, etc.

EventMapr uses [Mapbox](https://www.mapbox.com/) which is licensed [separately](https://github.com/mapbox/mapbox-gl-js/blob/master/LICENSE.txt)

EventMapr is Copyright © 2019 Michael Landi 