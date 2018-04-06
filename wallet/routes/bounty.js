var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/ ', function (req, res) {
    db.query('SELECT * FROM bounty', function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bounties'});
        });
    });


router.get('/search/:keyword', function (req, res) {
        var keyword = req.params.keyword;
    db.query("SELECT * FROM bounty WHERE bounty LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bounty search list.'});
        });
    });


router.get('/:id', function (req, res) {

        var bounty_id = req.params.id;

    db.query('SELECT * FROM bounty where id=?', bounty_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'Bounty list.'});
        });

    });


    // Add a new todo
router.post('/todo', function (req, res) {

        var bounty = req.body.bounty;

        if (!bounty) {
            return res.status(400).send({error: true, message: 'Please provide Bounty'});
        }

    db.query("INSERT INTO bounty SET ? ", {bounty: bounty}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New Bounty has been created successfully.'});
        });
    });

    //  Update bounty with id
router.put('/update', function (req, res) {

        var bounty_id = req.body.bounty_id;
        var bounty = req.body.bounty;

        if (!bounty_id || !bounty) {
            return res.status(400).send({error: bounty, message: 'Please provide a bounty and bounty_id'});
        }

    db.query("UPDATE bounty SET bounty = ? WHERE id = ?", [bounty, bounty_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bounty has been updated successfully.'});
        });
    });


    // Delete bounty
router.delete('delete/:id', function (req, res) {

        var bounty_id = req.params.id;

        db.query('DELETE FROM bounty WHERE id = ?', [bounty_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bounty has been deleted successfully.'});
        });

    });


module.exports = router;