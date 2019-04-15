class MockMaprApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getConfiguration() {
        return {
            map: {
                lineDuration: 3000,
                theme: 'mapbox://styles/mapbox/dark-v10',
                divId: 'map',
                centerLatitude: -98.585522,
                centerLongitude: 39.8333333,
                zoom: '3.5',
                apiKey: this.apiKey,
                legendTitle: 'Event Type'
            },
            types: {
                "event1": "red",
                "event2": "yellow"
            },
            sites: [
                {
                    name: "ny",
                    latitude: 40.7167,
                    longitude: -74,
                    icon: 'img/marker.png',
                    iconWidth: '25px',
                    iconHeight: '25px'
                },
                {
                    name: "ch",
                    latitude: 41.881832,
                    longitude: -87.623177,
                    icon: 'img/marker.png',
                    iconWidth: '25px',
                    iconHeight: '25px'
                },
            ]
        }
    }
}