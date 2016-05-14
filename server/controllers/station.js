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
                // res.json(stationObject);
                stationObject["stationBeanList"].forEach(function(divvyStation){
                    console.log(divvyStation.stationName);
                    var station = new Station(
                        {
                            stationId: divvyStation.id,
                            stationName: divvyStation.stationName,
                            totalDocks: divvyStation.totalDocks,
                            availableDocks: divvyStation.availableDocks,
                            latitude: divvyStation.latitude,
                            longitude: divvyStation.longitude,
                            availableDocks: divvyStation.availableDocks
                        }
                    );
                    console.log(station.stationName);
                    station.save(function(err) {
                        if(err)
                            console.log(err);
                    });
                });
            };
        });
        // res.json(stationObject);
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
        var station = req.body.station;
        myStation.brand = station.brand;
        myStation.price = station.price;
        myStation.save(function (err, station) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(station)
            }
        });
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
