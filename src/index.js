const {createStravaApiClient} = require("./adapters/strava-api-adapter");
const repository = require("./adapters/strava-repository-adapter");
const env = require("./adapters/env");

(async () => {
    console.info("start...")
    let startDate = await repository.getLastRecordedActivityDate();

    let client = await getStravaApiClient();
    let newActivities = await client.getLoggedInAthleteActivities(startDate)
    if (newActivities.length > 0) {

        // FIXME synchronous to avoid "too many request" error to de-synchronize athlete_activities.json and activites/*
        for (const newActivity of newActivities) {
            await repository.addNewAthleteActivities(newActivity)
                .then(activity => client.getActivityById(activity.id), activity => {
                    repository.removeAthleteActivities(activity.id);
                })
                .then(repository.addNewActivity)
        }

    } else {
        console.info("No new activity.")
    }
    console.info("end...")
})()

async function getStravaApiClient() {
    let token = env.getToken();
    return createStravaApiClient(token);
}


