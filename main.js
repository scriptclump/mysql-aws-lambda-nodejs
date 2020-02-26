'use strict';

var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function(err, connection){
        // Use the connection
        connection.query("SELECT * FROM `users`", function(error, results, fields){
            // Release the connection
            connection.release();
            // Handel error after release
            if (error) callback(error);
            else callback(null, results[0].username);
     
            // Don't use the connection here, It has returned to the pool
        });
    
    });
};
