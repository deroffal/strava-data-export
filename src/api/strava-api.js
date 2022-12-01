const Swagger = require('swagger-client');
const env = require("../env");

class StravaApi {
    constructor(token) {
        this.token = token
    }

    async _doInitialize() {
        const requestInterceptor = (request) => {
            let proxy = process.env['HTTP_PROXY'];
            if (proxy) {
                const HttpsProxyAgent = require('https-proxy-agent')
                request.agent = new HttpsProxyAgent(proxy)
            }
            request.headers["Authorization"] = `Bearer ${this.token}`
            return request;
        };

        let client = await new Swagger({
            url: 'https://developers.strava.com/swagger/swagger.json',
            requestInterceptor
        });

        this.activitiesAPI = client.apis.Activities

        return this;
    }

    //FIXME handle pagination
    async getLoggedInAthleteActivities(start_date) {
        let time = start_date.getTime() / 1_000;
        return this.activitiesAPI.getLoggedInAthleteActivities({
            after: time,
            per_page: 100
        })
            .then(response => JSON.parse(response.data));
    }

    async getActivityById(id) {
        return this.activitiesAPI.getActivityById({id: id})
            .then(response => JSON.parse(response.data));
    }


}

async function createStravaClient() {
    let token = env.getToken();
    return new StravaApi(token)._doInitialize()
}


module.exports = {createStravaClient}
