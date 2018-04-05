'use strict';
module.exports = function(app) {

    app.route('/bounty');
    app.route('/entitytpe');
    app.route('/transactions');
    app.route('/user');
    app.route('/wallet');
// all other requests redirect to 404
    app.all("*", function (req, res, next) {
        return res.send('page not found');
        next();
    })

};
