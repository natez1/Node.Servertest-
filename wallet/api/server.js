
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
const mc = mysql.createConnection({
    host: 'dev.stroken.com',
    user: 'nate',
    password: '',
    database: 'pr0nToken'
});

// connect to database
mc.connect();

var routes = require('/api/route/main');
routes(app);



// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});












