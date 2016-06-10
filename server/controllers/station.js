// Include Mongoose Model
var StationModel = require('../models/station');
var request = require('request');

Station = function () {

    var self = this;

    self.seedStations = function(req, res, next){
        var stationObject;

        request.get("http://www.divvybikes.com/stations/json/", function (err, res, body) {
            if (!err) {
                var stationObject = JSON.parse(body);
                // console.log(stationObject["stationBeanList"]);
                stationObject["stationBeanList"].forEach(function(divvyStation){
                    var myStation = new StationModel();
                    myStation.stationId = divvyStation.id;
                    myStation.stationName = divvyStation.stationName;
                    myStation.totalDocks = divvyStation.totalDocks;
                    myStation.availableDocks = divvyStation.availableDocks;
                    myStation.availableBikes = divvyStation.availableBikes;
                    myStation.latitude = divvyStation.latitude;
                    myStation.longitude = divvyStation.longitude;
                    myStation.coords = {
                        latitude: divvyStation.latitude,
                        longitude: divvyStation.longitude
                    };
                    myStation.save(function(err,station){
                        if(err){
                            res.send(err);
                        }
                        else{
                            console.log(myStation);
                            // res.json(station);
                        }
                    });
                });
            };
        });
        // res.json(stationObject);
        res.sendStatus(200);
    };

    self.updateAll = function (req, res, next) {
        var stationObject;
        
        request.get("http://www.divvybikes.com/stations/json/", function (err, res, body) {
            if (!err) {
                var stationObject = JSON.parse(body);
                stationObject["stationBeanList"].forEach(function(divvyStation){
                    console.log(divvyStation);
                    StationModel.findOneAndUpdate({stationId: divvyStation.stationId}, {$set:{availableBikes:divvyStation.availableBikes,
                        availableDocks: divvyStation.availableDocks
                    }}, {multi: true}, function(err, doc) {
                        if(err){
                            res.send(err);
                        }else{
                            console.log('lol')
                        }
                    });
                });
            }
            else{
                console.log(err);
                res.send(err);
            }
        });
        // res.sendStatus(200);
        StationModel.find(function (err, stations) {
            res.json(stations)
        });
    };

    self.all = function (req, res, next) {
        StationModel.find(function (err, stations) {
            res.json(stations)
        });
    };
    
    self.findOne = function (req, res, next) {
        StationModel.findOne({_id: req.params.id}, function (err, station) {
            res.json(station)
        });
    };

    self.update = function (req, res, next) {
        StationModel.update({_id: req.body._id},req.body, function (err, station) {
            console.log(station);
            console.log(err);
            if(err){
                console.log(err);
                res.send(err);
            }
            res.json(station)
        });
    };

    self.create = function (req, res, next) {
        var myStation = new StationModel();

        request.get("http://www.divvybikes.com/stations/json/", function (err, res, body) {
            if (!err) {
                var stationObject = JSON.parse(body);
                stationObject["stationBeanList"].forEach(function(divvyStation){
                    myStation.stationId = divvyStation.id;
                    myStation.stationName = divvyStation.stationName;
                    myStation.totalDocks = divvyStation.totalDocks;
                    myStation.availableDocks = divvyStation.availableDocks;
                    myStation.latitude = divvyStation.latitude;
                    myStation.longitude = divvyStation.longitude;
                    console.log(myStation);
                    myStation.save();
                });
            };
        });
        res.json(myStation);
    };

    self.remove = function (req, res, next) {
        StationModel.remove({_id: req.query._id}, function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.sendStatus(204)
            }

        })
    }
};

module.exports = new Station;
