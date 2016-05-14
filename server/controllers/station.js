// Include Mongoose Model
var StationModel = require('../models/station');

Station = function () {

    var self = this;

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