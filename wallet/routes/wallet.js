var express = require('express');
var db = require('../db');
var router = express.Router();


router.get('/', function (req, res,next) {
    db.query('SELECT * FROM wallet', function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'wallet'});
        });
    });


///Search wallet
router.get('/search/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.query("SELECT * FROM wallet WHERE wallet LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Todos search list.'});
    });
});

//get wallet by ID

router.get(' single/:id', function (req, res) {

    var wallet_id = req.params.id;

    db.query('SELECT * FROM wallet where id=?', wallet_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results[0], message: 'wallet list.'});
    });

});

// Add a new todo
router.post('/todo', function (req, res) {

    var wallet = req.body.wallet;

    if (!wallet) {
        return res.status(400).send({error: true, message: 'Please provide wallet'});
    }

    db.query("INSERT INTO wallet SET ? ", {wallet: wallet}, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'New wallet has been created successfully.'});
    });
});

//  Update wallet with id
router.put('/update', function (req, res) {

    var wallet_id = req.body.wallet_id;
    var wallet = req.body.wallet;

    if (!wallet_id || !wallet) {
        return res.status(400).send({error: wallet, message: 'Please provide a wallet and wallet_id'});
    }

    db.query("UPDATE wallet SET wallet = ? WHERE id = ?", [wallet, wallet_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'Wallet has been updated successfully.'});
    });
});


//  Delete todo
router.delete('/delete/:id', function (req, res) {

    var wallet_id = req.params.id;

    db.query('DELETE FROM wallet WHERE id = ?', [wallet_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'wallet has been deleted successfully.'});
    });

});




module.exports = router;
