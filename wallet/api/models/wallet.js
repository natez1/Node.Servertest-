'use strict';
module.exports = function(app) {
    app.get('/wallet', function (req, res) {
        mc.query('SELECT * FROM wallet', function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'wallet'});
        });
    });


    //Search wallet
    app.get('/wallet/search/:keyword', function (req, res) {
        let keyword = req.params.keyword;
        mc.query("SELECT * FROM wallet WHERE wallet LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Todos search list.'});
        });
    });

    //get wallet by ID

    app.get('/wallet/:id', function (req, res) {

        let wallet_id = req.params.id;

        mc.query('SELECT * FROM wallet where id=?', wallet_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'wallet list.'});
        });

    });


    // Add a new todo
    app.post('/wallet/todo', function (req, res) {

        let wallet = req.body.wallet;

        if (!wallet) {
            return res.status(400).send({error: true, message: 'Please provide wallet'});
        }

        mc.query("INSERT INTO wallet SET ? ", {wallet: wallet}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New wallet has been created successfully.'});
        });
    });

    //  Update wallet with id
    app.put('wallet/todo', function (req, res) {

        let wallet_id = req.body.wallet_id;
        let wallet = req.body.wallet;

        if (!wallet_id || !wallet) {
            return res.status(400).send({error: wallet, message: 'Please provide a wallet and wallet_id'});
        }

        mc.query("UPDATE wallet SET wallet = ? WHERE id = ?", [wallet, wallet_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete todo
    app.delete('/wallet/:id', function (req, res) {

        let wallet_id = req.params.id;

        mc.query('DELETE FROM wallet WHERE id = ?', [wallet_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'wallet has been deleted successfully.'});
        });

    });


    };

};

