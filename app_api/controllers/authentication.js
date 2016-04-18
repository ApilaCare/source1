var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    // respond with an error status if not al required fields are found
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    //create a new user instance and set name and email
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    // use setPassword method to set salt and hash
    user.setPassword(req.body.password);

    // save new user to MongoDB
    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            // generate a JWT using schema method and send it to browser
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });

};

module.exports.login = function(req, res) {
    // validate that required fields have been supplied
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    // pass name of strategy and a callback to authenticate method
    passport.authenticate('local', function(err, user, info) {
        var token;
        // return an error if Passport returns an error
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        // if Passport returned a user instance, generate and send a JWT (json web token)
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
            // otherwise return infor message (why authentication failed)
        } else {
            sendJSONresponse(res, 401, info);
        }
        // make sure that req and res are available to Passport
    })(req, res);
};
