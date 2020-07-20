const request = require("request-promise"); //import this library that allows for http requests to api's
const API_KEY = "eb9e08353c0a947aed7a5a581619621b";


class Weather {
    //takes a city name & callback function as parameters
    //pass in an object to request which caintains uri, json. then chain on "then()" function which uses a callback
    //the callback will return the data once it's been recieved through the response variable
    static retrieveByCity (city, callback) {
      request({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
        json: true
      }).then((res) => {
          //pass the response recieved from api to callback function to backend express
        //callback is the link between express backend & the data result from api request
          callback(res);
      }).catch((err) => {
        console.log(err);
        callback({ error: 'Could not reach OpenWeatherMap API.' });
      });
    }
}
  
  module.exports = Weather;