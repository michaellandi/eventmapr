class MaprApi {
    constructor(url) {
        this.url = url;
    }

    getConfiguration() {
        const url = `${this.url}/configuration`;

        var request = new XMLHttpRequest();
        request.open('GET', url, false); 
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText);
        }

    }
}