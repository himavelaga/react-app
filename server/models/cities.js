const db = require('../database');

class Cities {
    //takes in a functin argument 
    static retrieveAll (callback) {
      db.query('SELECT city_name from cities', (err, res) => {
        if (err.error)
          return callback(err);
        callback(res); 
      });
    }
  
    //adds a new city
    static insert (city, callback) {
      db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
        if (err.error)
          return callback(err);
        callback(res);
      });
    }
}
module.exports = Cities;