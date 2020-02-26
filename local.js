'use strict';

var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
});

pool.getConnection(function(err, connection){
    // Use the connection
    connection.query("SELECT * FROM `users`", function(error, results, fields){
        // Release the connection
        connection.release();
        // Handel error after release
        if (error) throw error;
        else console.log(results[0].username);

        process.exit();

        // Don't use the connection here, It has returned to the pool
    });

});