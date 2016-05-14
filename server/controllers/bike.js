// Include Mongoose Model
var BikeModel = require('../models/bike');

Bike = function () {

    var self = this;

    self.all = function (req, res, next) {
        BikeModel.find(function (err, bikes) {
            res.json(bikes)
        });
    };
    
    self.findOne = function (req, res, next) {
        BikeModel.findOne({_id: req.params.id}, function (err, bike) {
            res.json(bike)
        });
    };

    self.update = function (req, res, next) {
        BikeModel.update({_id: req.body._id},req.body, function (err, bike) {
            console.log(bike);
            console.log(err);
            if(err){
                console.log(err);
                res.send(err);
            }
            res.json(bike)
        });
    };

    self.create = function (req, res, next) {
        var myBike = new BikeModel();
        var bike = req.body.bike;
        myBike.brand = bike.brand;
        myBike.price = bike.price;
        myBike.save(function (err, bike) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(bike)
            }
        });
    };

    self.remove = function (req, res, next) {
        BikeModel.remove({_id: req.query._id}, function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.sendStatus(204)
            }

        })
    }
};

module.exports = new Bike;
