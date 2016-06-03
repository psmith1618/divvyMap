// Include Mongoose Model
var StationModel = require('../models/station');
var request = require('request');

Station = function () {

    var self = this;

    self.seedStations = function(req, res, next){
        var stationObject;
        var station = new StationModel();

        request.get("http://www.divvybikes.com/stations/json/", function (err, res, body) {
            if (!err) {
                var stationObject = JSON.parse(body);
                stationObject["stationBeanList"].forEach(function(divvyStation){
                    station.save(function(err) {
                        if(err){
                            console.log(err);
                        }else{
                            return res;
                        }
                    });
                });
            };
        });
        res.json(stationObject);
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
                console.log(stationObject["stationBeanList"][0]);
                myStation.stationId = stationObject["stationBeanList"][0].id;
                myStation.stationName = stationObject["stationBeanList"][0].stationName;
                myStation.totalDocks = stationObject["stationBeanList"][0].totalDocks;
                myStation.availableDocks = stationObject["stationBeanList"][0].availableDocks;
                myStation.latitude = stationObject["stationBeanList"][0].latitude;
                myStation.longitude = stationObject["stationBeanList"][0].longitude;
                console.log(myStation);
                myStation.save();
            };
        });
        myStation.save(function (err, station) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(station.stationName);
                res.json(station);
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
