var mongoose = require('mongoose');
var Resid = mongoose.model('Resident');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// api/residents/new
module.exports.residentsCreate = function(req, res) {
    console.log(req.body);

    // create resident from the inputed data
    Resid.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        maidenName: req.body.maidenName,
        admissionDate: req.body.admissionDate,
        buildingStatus: req.body.buildingStatus,
        sex: req.body.sex,
        submitBy: req.payload.name,
    }, function(err, resident) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(resident);
            sendJSONresponse(res, 200, resident);
        }
    });
};

// GET list of residents
module.exports.residentsList = function(req, res) {
    Resid.find({}, function(err, residents) {
        console.log(residents);
        sendJSONresponse(res, 200, residents)
    });
};

// GET /api/residents/:residentid
module.exports.residentsReadOne = function(req, res) {
    console.log('Finding resident details', req.params);
    if (req.params && req.params.residentid) {
        Resid
            .findById(req.params.residentid)
            .exec(function(err, resident) {
                if (!resident) {
                    sendJSONresponse(res, 404, {
                        "message": "residentid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(resident);
                sendJSONresponse(res, 200, resident);
            });
    } else {
        console.log('No residentid specified');
        sendJSONresponse(res, 404, {
            "message": "No residentid in request"
        });
    }
};

module.exports.residentById = function(req, res) {
    console.log("pozvao" + req.params.residentid);

    Resid
        .findById(req.params.residentid)
        .exec(
            function(err, resident) {

                console.log(resident);
                if (!resident) {
                    sendJSONresponse(res, 404, {
                        "message": "resident not found"
                    });
                } else {

                    sendJSONresponse(res, 200, resident);
                }
            });
};


// PUT /api/residents/update/:residentid
module.exports.residentsUpdateOne = function(req, res) {

    if (!req.params.residentid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, residentid is required"
        });
        return;
    }

    var updateInfo = {
        "updateBy": req.body.modifiedBy,
        "updateDate": req.body.modifiedDate,
        "updateField": req.body.updateField
    };

    console.log(req.params.residentid);

    Resid
        .findById(req.params.residentid)
        .exec(
            function(err, resident) {
                if (!resident) {
                    sendJSONresponse(res, 404, {
                        "message": "residentid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                resident.title = req.body.title;
                resident.responsibleParty = req.body.responsibleParty;
                resident.resolutionTimeframe = req.body.resolutionTimeframe;
                resident.submitBy = req.body.submitBy;
                resident.description = req.body.description;
                resident.updateInfo.push(updateInfo);
                resident.save(function(err, resident) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, resident);
                    }
                });
            }
        );
};

// DELETE /api/resident/:residentid
module.exports.residentsDeleteOne = function(req, res) {
    var residentid = req.params.residentid;
    if (residentid) {
        Resid
            .findByIdAndRemove(residentid)
            .exec(
                function(err, resident) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("resident id " + residentid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No residentid"
        });
    }
};

var getAuthor = function(req, res, callback) {
    console.log("Finding author with email " + req.payload.email);
    // validate that JWT information is on request object
    if (req.payload.email) {
        User
        // user email address to find user
            .findOne({
                email: req.payload.email
            })
            .exec(function(err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(user);
                // run callback, passing user's name
                callback(req, res, user.name);
            });

    } else {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
};


/* adding documents to mongodb
db.residents.save({

})
*/
