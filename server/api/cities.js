var express = require('express');
var Cities = require('../models/cities');

//module that handles all middleware for a particular part of backend - in this case the cities data & define http methods for 
var router = express.Router();


//return response in json format to front end
router.get('/', (req, res) => {
    //retrieveall method from Cities takes in this callback function as parameter. this callback function takes in err& cities parameters
   //if err found, send it as json. otherwise send cities object as json
    Cities.retrieveAll((err, cities) => {
      if (err)
        return res.json(err);
      return res.json(cities);
    });
});
  
//the name of the city to insert. return the error as json response to frontend
router.post('/', (req, res) => {
    var city = req.body.city;
  
    Cities.insert(city, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
});
  
module.exports = router; //import this in the index.js file in server
