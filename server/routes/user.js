var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../controllers/user');

router.use(bodyParser.json()); //turns POST and PUT JSON into req.body object

router.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', req.headers.origin || req.hostname);
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', "Content-Type");
    res.set('Access-Control-Allow-Credentials', "true");
    //res.set('Content-Type', 'application/json');
    next();
});

//..controllers/user.js 

// Get all the users
router.get('/',User.all);
// Create a user
router.post('/', User.create);
// Remove a user
router.delete('/', User.remove);
// Get a user
router.get('/:id',User.findOne);
// Update a user
router.put('/:id', User.update);


module.exports = router;