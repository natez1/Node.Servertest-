module.exports = function(app) {
    app.get('/transactions ', function (req, res) {
        mc.query('SELECT * FROM wallet', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'transactions' });
        });
    });

    //Search wallet
    app.get('/transactions/search/:keyword', function (req, res) {
        let keyword = req.params.keyword;
        mc.query("SELECT * FROM transactions WHERE transactions LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Todos search list.'});
        });
    });

    //get wallet by ID

    app.get('/transactions/:id', function (req, res) {

        let user_id = req.params.id;

        mc.query('SELECT * FROM transactions where id=?', transactions_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'transactions list.'});
        });

    });


    // Add a new todo
    app.post('/transactions/todo', function (req, res) {

        let user = req.body.user;

        if (!user) {
            return res.status(400).send({error: true, message: 'Please provide transactions'});
        }

        mc.query("INSERT INTO transactions SET ? ", {user: user}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New transactions has been created successfully.'});
        });
    });

    //  Update wallet with id
    app.put('user/todo', function (req, res) {

        let transactions_id = req.body.transactions_id;
        let transactions = req.body.wallet;

        if (!transactions_id || !transactions) {
            return res.status(400).send({error:transactions, message: 'Please provide a transactions and transactions_id'});
        }

        mc.query("UPDATE transactions SET transactions = ? WHERE id = ?", [transactions, transactions_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete todo
    app.delete('/transactions/:id', function (req, res) {

        let transactions_id = req.params.id;

        mc.query('DELETE FROM transactions WHERE id = ?', [transactions_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'transactions has been deleted successfully.'});
        });

    });


};
};
