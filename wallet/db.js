var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'dev.stroken.com',
    user     : 'nate',
    password : 'dTBkuwAoor',
    database : 'pr0nwallet'
});

module.exports = connection;