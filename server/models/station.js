var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var StationSchema   = new Schema({
    stationId: Number,
    stationName: String,
    totalDocks: Number,
    availableDocks: Number,
    latitude: Number,
    longitude: Number,
    availableBikes: Number,
    coords: Object
});

//export the schema so it can be used elsewhere in the application
// (wherever we require it)

module.exports = mongoose.model('Station', StationSchema);