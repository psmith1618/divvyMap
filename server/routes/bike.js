var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Bike = require('../controllers/bike');

router.use(bodyParser.json()); //turns POST and PUT JSON into req.body object

router.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', req.headers.origin || req.hostname);
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', "Content-Type");
    res.set('Access-Control-Allow-Credentials', "true");
    //res.set('Content-Type', 'application/json');
    next();
});

//..controllers/bike.js 

// Get all the bikes
router.get('/',Bike.all); 
// Create a bike
router.post('/', Bike.create);
// Remove a Bike
router.delete('/', Bike.remove);
// Get a bike
router.get('/:id',Bike.findOne);
// Updat a Bike
router.put('/:id', Bike.update);


module.exports = router;