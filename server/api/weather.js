var express = require('express');
var Weather = require('../models/weather');

var router = express.Router();

//define the path with a city parameter 
router.get('/:city', (req, res) => {
  var city = req.params.city;

  //retireivebycity method from weather model called inside with city name & callback function as parameters. callback function
  //
  Weather.retrieveByCity(city, (err, weather) => {
    if (err) 
      return res.json(err);
    return res.json(weather);
  });
});

module.exports = router;