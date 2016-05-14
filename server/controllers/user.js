// Include Mongoose Model
var UserModel = require('../models/user');

User = function () {

    var self = this;

    self.all = function (req, res, next) {
        UserModel.find(function (err, users) {
            res.json(users)
        });
    };

    self.findOne = function (req, res, next) {
        UserModel.findOne({_id: req.params.id}, function (err, user) {
            res.json(user)
        });
    };

    self.update = function (req, res, next) {
        UserModel.update({_id: req.body._id},req.body, function (err, user) {
            console.log(user);
            console.log(err);
            if(err){
                console.log(err);
                res.send(err);
            }
            res.json(user)
        });
    };

    self.create = function (req, res, next) {
        var myUser = new UserModel();
        var user = req.body.user;
        myUser.first_name = user.first_name;
        myUser.last_name  = user.last_name;
        myUser.save(function (err, user) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(user)
            }
        });
    };

    self.remove = function (req, res, next) {
        UserModel.remove({_id: req.query._id}, function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.sendStatus(204)
            }

        })
    }
};

module.exports = new User;
