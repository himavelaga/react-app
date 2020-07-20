var { Pool } = require('pg'); //import pool from postgres client. interface to interact with postgres instance installed on our server whether local or deployed somewhere

//if process is passed a database url use that otherwise the given string which connects to localhose postgres databasae
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:brogrammer@localhost:5432/db';
const SSL = process.env.NODE_ENV === 'production'; //if env is prod, then true. when we deploy to heroku, heroku will set the database url in the above line


class Database {
    constructor () {
        //create a new pool & pass connectin string & ssl setting
      this._pool = new Pool({
        connectionString: CONNECTION_STRING, 
        ssl: SSL
      });
  
      //error handling for the pool if there's any problem connecting to database.
      this._pool.on('error', (err, client) => {
        console.error('Unexpected error on idle PostgreSQL client.', err);
        process.exit(-1);
      });
  
    }



    query (query, ...args) {

        this._pool.connect((err, client, done) => {
          if (err){ throw err; }
          const params = args.length === 2 ? args[0] : [];
          const callback = args.length === 1 ? args[0] : args[1];
    
          //after a postgres connection, call query method & pass in string query & params
          //and execute a callback if no errors that returns the rows
          client.query(query, params, (err, res) => {
            done();
            if (err) {
              console.log(err.stack);
              return callback({ error: 'Database error.' }, null);
            }
            callback({}, res.rows);
          });
        }); 
    
    }
    
    //called after done using database connection. eds th epool
    end () {
        this._pool.end();
    }
}

module.exports = new Database(); //export the class so it can be used when imported in other files. it returns a new instanc of database when imported