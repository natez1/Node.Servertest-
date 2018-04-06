var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/ ', function (req, res) {
        db.query('SELECT * FROM transactions', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'transactions' });
        });
    });

    //Search transactions
router.get('/search/:keyword', function (req, res) {
        var keyword = req.params.keyword;
        db.query("SELECT * FROM transactions WHERE transactions LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Todos search list.'});
        });
    });

    //get transactions by ID

router.get('/:id', function (req, res) {

        var user_id = req.params.id;

        db.query('SELECT * FROM transactions where id=?', transactions_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'transactions list.'});
        });

    });


    // Add a new todo
router.post('/todo', function (req, res) {

        var user = req.body.user;

        if (!user) {
            return res.status(400).send({error: true, message: 'Please provide transactions'});
        }

        db.query("INSERT INTO transactions SET ? ", {user: user}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New transactions has been created successfully.'});
        });
    });

    //  Update transactions with id
router.put('/update', function (req, res) {

        var transactions_id = req.body.transactions_id;
        var transactions = req.body.transactions;

        if (!transactions_id || !transactions) {
            return res.status(400).send({error:transactions, message: 'Please provide a transactions and transactions_id'});
        }

        db.query("UPDATE transactions SET transactions = ? WHERE id = ?", [transactions, transactions_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete todo
router.delete('/delete/:id', function (req, res) {

        var transactions_id = req.params.id;

        db.query('DELETE FROM transactions WHERE id = ?', [transactions_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'transactions has been deleted successfully.'});
        });

    });

    module.exports = router;

