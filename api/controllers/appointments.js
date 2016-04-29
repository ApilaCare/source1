var mongoose = require('mongoose');
var Appoint = mongoose.model('Appointment');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.testCall = function(req, res) {
    sendJSONresponse(res, 200, {status:"cool"});
}

/* POST /api/appointments/new */
module.exports.appointmentsCreate = function(req, res) {

    //here we join the date & time
    var d = new Date(req.body.date);
    var t = new Date(req.body.time);

    console.log(d);

    d.setHours(t.getHours());
    d.setMinutes(t.getMinutes());

    //create appointment from the inputed data
    Appoint.create({
        reason: req.body.reason,
        locationName: req.body.locationName,
        locationDoctor: req.body.locationDoctor,
        residentGoing: req.body.residentId,
        time: d,
        submitBy: req.payload.name,
        transportation: req.body.transportation,
    }, function(err, appointment) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            getFullAppointment(req, res, appointment._id);
        }
    });
};

/* GET list of appointments */
module.exports.appointmentsList = function(req, res) {

    // change sensitivity to day rather than by minute
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    Appoint.find({
      /*  time: {
            $gte: start
        }*/
    }).populate("residentGoing").exec(function(err, appointments) {
        console.log(appointments);
        console.log("In appointment list");
        sendJSONresponse(res, 200, appointments)
    });
};

// get a single appointment details
module.exports.appointmentsReadOne = function(req, res) {
    console.log('Finding appointment details', req.params);
    if (req.params && req.params.appointmentid) {
        Appoint
            .findById(req.params.appointmentid)
            .populate("residentGoing")
            .exec(function(err, appointment) {
                if (!appointment) {
                    sendJSONresponse(res, 404, {
                        "message": "appointmentid not found (from controller)"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(appointment);
                sendJSONresponse(res, 200, appointment);
            });
    } else {
        console.log('No appointmentid specified');
        sendJSONresponse(res, 404, {
            "message": "No appointmentid in request"
        });
    }
};

/* PUT /api/appointments/:appointmentid */
module.exports.appointmentsUpdateOne = function(req, res) {

    if (!req.params.appointmentid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, appointmentid is required"
        });
        return;
    }

    Appoint
        .findById(req.params.appointmentid)
        .exec(
            function(err, appointment) {
                if (!appointment) {

                    sendJSONresponse(res, 404, {
                        "message": "appointmentid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }

                var d = new Date(req.body.date);
                var t = new Date(req.body.time);

                d.setHours(t.getHours());
                d.setMinutes(t.getMinutes());
                d.setSeconds(t.getSeconds());

                var updateInfo = {
                    "updateBy": req.body.modifiedBy,
                    "updateDate": req.body.modifiedDate,
                    "updateField": req.body.updateField
                };
                console.log(updateInfo);

                appointment.reason = req.body.reason,
                    appointment.locationName = req.body.locationName,
                    appointment.locationDoctor = req.body.locationDoctor,
                    appointment.residentGoing = req.body.residentId,
                    appointment.time = d,
                    appointment.transportation = req.body.transportation,
                    appointment.cancel = req.body.cancel,
                    appointment.updateInfo.push(updateInfo);
                appointment.save(function(err, appointment) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, appointment);
                    }
                });
            }
        );
};


/* DELETE /api/appointments/:appointmentid */
module.exports.appointmentsDeleteOne = function(req, res) {
    var appointmentid = req.params.appointmentid;
    if (appointmentid) {
        Appoint
            .findByIdAndRemove(appointmentid)
            .exec(
                function(err, appointment) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("appointment id " + appointmentid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No appointmentid"
        });
    }
};

var getFullAppointment = function(req, res, appointId) {
      Appoint
            .findById(appointId)
            .populate("residentGoing")
            .exec(function(err, appointment) {
                if (!appointment) {
                    sendJSONresponse(res, 404, {
                        "message": "appointmentid not found (from controller)"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(appointment);
                sendJSONresponse(res, 200, appointment);
            });
}


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
