var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/entityype', function (req, res) {
        db.query('SELECT * FROM entityype', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'entityype' });
        });
    });
    //Search Entities
router.get('/search/:keyword', function (req, res) {
        var keyword = req.params.keyword;
        db.query("SELECT * FROM entityype WHERE entityype LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Entityype search list.'});
        });
    });

    //get entities by ID

router.get('/single/:id', function (req, res) {

        var entityype_id = req.params.id;

        db.query('SELECT * FROM entityype where id=?', entityype_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'Entityype list.'});
        });

    });


    // Add a new todo
router.post('/todo', function (req, res) {

        var  entityype = req.body.entityype;

        if (!entityype) {
            return res.status(400).send({error: true, message: 'Please provide entities'});
        }

        db.query("INSERT INTO entityype SET ? ", {entityype: entityype}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New Entites has been created successfully.'});
        });
    });

    //  Update entities with id
router.put('/update', function (req, res) {

        var entityype_id = req.body.entityype_id;
        var entityype = req.body.entityype;

        if (!entityype_id || !entityype) {
            return res.status(400).send({error: entityype, message: 'Please provide a entities and entities_id'});
        }

        db.query("UPDATE entityype SET entityype = ? entityype id = ?", [entityype, entityype_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete entities
router.delete('/delete/:id', function (req, res) {

        var entityype_id = req.params.id;

        db.query('DELETE FROM entityype WHERE id = ?', [entitype_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'entityype  has been deleted successfully.'});
        });
});


module.exports = router;







