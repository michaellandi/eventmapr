class Mapr {
    maxOpacity = 0.6;
    defaultLineColor = "white";

    constructor(api) {
        this.config = api.getConfiguration();

        mapboxgl.accessToken = this.config.map.apiKey;
        this.map = new mapboxgl.Map({
            container: this.config.map.divId,
            style: this.config.map.theme,
            center: [this.config.map.centerLatitude, this.config.map.centerLongitude],
            zoom: this.config.map.zoom
        });

        this.map.on('load', this.setMarkers());
    }

    drawLine = function (origin, siteId, typeId) {
        var site = this.getSiteFromId(siteId);
        var color = this.getColorFromTypeId(typeId);

        var coordinates = new Array();
        coordinates.push(origin);
        coordinates.push([site.longitude, site.latitude]);

        var id = this.uuidv4();
        var layer = {
            "id": id,
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coordinates
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": color,
                "line-width": 3,
                "line-opacity": 0
            }
        };

        this.map.addLayer(layer);

        var instance = this;
        this.fadeLineIn(id);
        setTimeout(function() {
            instance.fadeLineOut(id);
        }, this.config.map.lineDuration);
    }

    fadeLineIn(id, opacity = 0.0) {
        var instance = this; 
        this.map.setPaintProperty(id, 'line-opacity', Math.min(1, opacity += .01));
        if (opacity < this.maxOpacity) {
          setTimeout(function() {
            instance.fadeLineIn(id, opacity);
          }, 10);
        }
    }

    fadeLineOut(id, opacity = this.maxOpacity) {   
        var instance = this;    
        this.map.setPaintProperty(id, 'line-opacity', Math.max(0, opacity -= .01));
        if (opacity > 0) {
          setTimeout(function() {
            instance.fadeLineOut(id, opacity);
          }, 10);
        }
        else
        {
            instance.map.removeLayer(id);
        }
    }

    setMarkers() {
      var instance = this;
      this.config.sites.forEach(function(site) {
        var el = document.createElement('div');
        el.className = 'marker';
        el.setAttribute('style', `background-image:url('${site.icon}');height:${site.iconHeight};width:${site.iconWidth}`);

        new mapboxgl.Marker(el)
          .setLngLat([site.longitude, site.latitude])
          .addTo(instance.map);
        })
    }

    getColorFromTypeId(typeId) {
        var color = this.config.types[typeId];
        if (color == undefined)
        {
            return this.defaultLineColor;
        }

        return color;
    }

    getSiteFromId(siteId) {
        var matchedSite = undefined;
        this.config.sites.forEach(function(site) {
            if (site.name === siteId) {
                matchedSite = site;
            }
        });

        return matchedSite;
    }

    fillLegend(elementId) {
        var el = document.getElementById(elementId);

        if (this.config.map.legendTitle) {
            var title = document.createElement('h4');
            var titleText = document.createTextNode(this.config.map.legendTitle);

            title.appendChild(titleText);
            el.appendChild(title);
        }

        for (var key in this.config.types)
        {
            var div = document.createElement('div');
            var span = document.createElement('span');
            span.setAttribute('style', `background-color:${this.config.types[key]}`);
            var divText = document.createTextNode(key);

            div.appendChild(span);
            div.appendChild(divText);
            el.appendChild(div);
        }
    }

    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
}