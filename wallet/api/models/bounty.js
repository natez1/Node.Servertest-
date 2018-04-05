module.exports = function(app) {

    app.get('/bounty ', function (req, res) {
        mc.query('SELECT * FROM wallet', function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'bounty'});
        });
    });


    app.get('/bounty/search/:keyword', function (req, res) {
        let keyword = req.params.keyword;
        mc.query("SELECT * FROM bounty WHERE bounty LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Todos search list.'});
        });
    });


    app.get('/bounty/:id', function (req, res) {

        let bounty_id = req.params.id;

        mc.query('SELECT * FROM bounty where id=?', bounty_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results[0], message: 'Bounty list.'});
        });

    });


    // Add a new todo
    app.post('/bounty/todo', function (req, res) {

        let bounty = req.body.bounty;

        if (!bounty) {
            return res.status(400).send({error: true, message: 'Please provide Bounty'});
        }

        mc.query("INSERT INTO bounty SET ? ", {bounty: bounty}, function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New Bounty has been created successfully.'});
        });
    });

    //  Update bounty with id
    app.put('bounty/todo', function (req, res) {

        let bounty_id = req.body.bounty_id;
        let bounty = req.body.bounty;

        if (!bounty_id || !bounty) {
            return res.status(400).send({error: bounty, message: 'Please provide a bounty and bounty_id'});
        }

        mc.query("UPDATE bounty SET bounty = ? WHERE id = ?", [bounty, bounty_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
        });
    });


    //  Delete todo
    app.delete('/bounty/:id', function (req, res) {

        let bounty_id = req.params.id;

        mc.query('DELETE FROM bounty WHERE id = ?', [bounty_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'Bounty has been deleted successfully.'});
        });

    });

};

