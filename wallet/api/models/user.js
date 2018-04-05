module.exports = function(app) {
    app.get('/user', function (req, res) {
        mc.query('SELECT * FROM user', function (error, results, fields) {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'users'});
        });
        //Search wallet
        app.get('/user/search/:keyword', function (req, res) {
            let keyword = req.params.keyword;
            mc.query("SELECT * FROM user WHERE user LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results, message: 'Todos search list.'});
            });
        });

        //get wallet by ID

        app.get('/user/:id', function (req, res) {

            let user_id = req.params.id;

            mc.query('SELECT * FROM user where id=?', user_id, function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results[0], message: 'user list.'});
            });

        });


        // Add a new todo
        app.post('/user/todo', function (req, res) {

            let user = req.body.user;

            if (!user) {
                return res.status(400).send({error: true, message: 'Please provide user'});
            }

            mc.query("INSERT INTO user SET ? ", {user: user}, function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results, message: 'New user has been created successfully.'});
            });
        });

        //  Update wallet with id
        app.put('user/todo', function (req, res) {

            let user_id = req.body.user_id;
            let wallet = req.body.wallet;

            if (!user_id || !user) {
                return res.status(400).send({error:user, message: 'Please provide a user and user_id'});
            }

            mc.query("UPDATE user SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results, message: 'Bask has been updated successfully.'});
            });
        });


        //  Delete todo
        app.delete('/wallet/:id', function (req, res) {

            let user_id = req.params.id;

            mc.query('DELETE FROM user WHERE id = ?', [user_id], function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results, message: 'user has been deleted successfully.'});
            });

        });


    };

};

