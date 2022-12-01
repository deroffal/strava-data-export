const {AthleteActivity, Activity} = require("./models");
const mongoose = require("mongoose");

const mongo_properties = {
    login: 'admin',
    password: 'password',
    cluster: 'localhost:27017',
    schema: 'admin'
}

async function connect() {
    return mongoose.connect(`mongodb://${mongo_properties.login}:${mongo_properties.password}@${mongo_properties.cluster}/${mongo_properties.schema}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

connect()
    .then(() => console.log('Database connected !'))
    .catch(() => console.error('Cannot connect to database !'));

async function getLastRecordedActivityDate() {
    return AthleteActivity.findOne().sort({start_date: -1})
        .then(activity => activity.start_date)
        .catch(error => {
            console.error("Error while getting last recorded activity : " + error);
            return new Date(2000, 0, 0)
        })
}

async function addNewAthleteActivities(newActivity) {
    return new AthleteActivity(newActivity).save()
}

async function removeAthleteActivities(id) {
    return AthleteActivity.deleteOne({id: id})
}


async function addNewActivity(newActivity) {
    return new Activity(newActivity).save()
}

module.exports = {
    getLastRecordedActivityDate, addNewAthleteActivities, removeAthleteActivities, addNewActivity
}
