const path = require('path'); //node js module for upening up paths
const express = require('express'); // backend server framework
const bodyParser = require('body-parser'); //http for sending data b/w backend & frontend

const ENV = process.env.NODE_ENV; //INFO OF WHETHER we are working in dev or prod
const PORT = process.env.PORT || 5000; //port where the express server is running. if the process is provided with port then use that or 5000

var db = require('./database'); //databse file we created is imported

//initialize express & middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities')); //register/import the cities api middleware created for cities that will allow GET & POST for cities data
app.use('/api/weather', require('./api/weather')); //register/import the weather api endpoint

//code to make express responsive to requests
//have express listen on port for requests & then express middleware will handle the request & respond
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

//get current time & date from local postgres server  & log to make sure it works
db.query('SELECT NOW()', (err, res) => {
    if (err.error)
      return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`); //first row of rows returned 
});
  



  //export app variable from file so it can be run via command
module.exports = app;