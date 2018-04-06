var express = require('express');
var db = require('../db');
var router = express.Router();


router.get('/', function (req, res) {
    db.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'users'});
    });
});

    //Search User
    router.get('/search/:keyword', function (req, res) {
        var keyword = req.params.keyword;
        db.query("SELECT * FROM user WHERE user LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Todos search list.'});
        });
    });

    //get user by ID

    router.get('single/:id', function (req, res) {

        var user_id = req.params.id;

        db.query('SELECT * FROM user where id=?', user_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'user list.'});
        });

    });


    // Add a new todo
    router.post('/todo', function (req, res) {

        var user = req.body.user;

        if (!user) {
            return res.status(400).send({error: true, message: 'Please provide user'});
        }

        db.query("INSERT INTO user SET ? ", {user: user}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New user has been created successfully.'});
        });
    });

    //  Update User  with id
    app.put('/update', function (req, res) {

        var user_id = req.body.user_id;
        var user = req.body.user;

        if (!user_id || !user) {
            return res.status(400).send({error: user, message: 'Please provide a user and user_id'});
        }

        db.query("UPDATE user SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete todo
    router.delete('/delete/:id', function (req, res) {

        var user_id = req.params.id;

        db.query('DELETE FROM user WHERE id = ?', [user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'user has been deleted successfully.'});
        });

    });
module.exports = router;





