var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Station = require('../controllers/station');

router.use(bodyParser.json()); //turns POST and PUT JSON into req.body object

router.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', req.headers.origin || req.hostname);
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', "Content-Type");
    res.set('Access-Control-Allow-Credentials', "true");
    //res.set('Content-Type', 'application/json');
    next();
});

//..controllers/station.js 

// Get all the stations
router.get('/',Station.seedStations); 
// Create a station
router.post('/', Station.create);
// Remove a station
router.delete('/', Station.remove);
// Get a station
router.get('/:id', Station.findOne);
// Update a station
router.put('/:id', Station.update);


module.exports = router;