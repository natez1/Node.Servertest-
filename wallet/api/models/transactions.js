module.exports = function(app) {
    app.get('/transactions ', function (req, res) {
        mc.query('SELECT * FROM wallet', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'transactions' });
        });
    });


};
