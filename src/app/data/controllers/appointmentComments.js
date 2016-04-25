var mongoose = require('mongoose');
var Appoint = mongoose.model('Appointment');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.appointmentCommentsCreate = function(req, res) {
    if (req.params.appointmentid) {
        Appoint
            .findById(req.params.appointmentid)
            .select('appointmentComment')
            .exec(
                function(err, appointment) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
                    } else {
                        doAddComment(req, res, appointment, req.payload.name);
                    }
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, appointmentid required"
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


var doAddComment = function(req, res, appointment, author) {
    if (!appointment) {
        sendJSONresponse(res, 404, "appointmentid not found");
    } else {
        appointment.appointmentComment.push({
            author: author,
            commentText: req.body.commentText
        });
        appointment.save(function(err, issue) {
            var thisComment;
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                thisComment = appointment.appointmentComment[appointment.appointmentComment.length - 1];
                sendJSONresponse(res, 201, thisComment);
            }
        });
    }
};

module.exports.appointmentCommentsUpdateOne = function(req, res) {
    if (!req.params.appointmentid || !req.params.commentid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, appointmentid and commentid are both required"
        });
        return;
    }
    Appoint
        .findById(req.params.appointmentid)
        .select('comments')
        .exec(
            function(err, appointment) {
                var thisComment;
                if (!appointment) {
                    sendJSONresponse(res, 404, {
                        "message": "appointmentid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                if (appointment.comments && appointment.comments.length > 0) {
                    thisComment = appointment.comments.id(req.params.commentid);
                    if (!thisComment) {
                        sendJSONresponse(res, 404, {
                            "message": "commentid not found"
                        });
                    } else {
                        thisComment.author = req.body.author;
                        thisComment.commentText = req.body.commentText;
                        appointment.save(function(err, appointment) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                sendJSONresponse(res, 200, thisComment);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No comment to update"
                    });
                }
            }
        );
};

module.exports.appointmentCommentsReadOne = function(req, res) {
    console.log("Getting single comment");
    if (req.params && req.params.appointmentid && req.params.commentid) {
        Appoint
            .findById(req.params.appointmentid)
            .select('reason comments')
            .exec(
                function(err, appointment) {
                    console.log(appointment);
                    var response, comment;
                    if (!appointment) {
                        sendJSONresponse(res, 404, {
                            "message": "appointmentid not found"
                        });
                        return;
                    } else if (err) {
                        sendJSONresponse(res, 400, err);
                        return;
                    }
                    if (appointment.comments && appointment.comments.length > 0) {
                        comment = appointment.comments.id(req.params.commentid);
                        if (!comment) {
                            sendJSONresponse(res, 404, {
                                "message": "commentid not found"
                            });
                        } else {
                            response = {
                                appointment: {
                                    reason: appointment.reason,
                                    id: req.params.appointmentid
                                },
                                comment: comment
                            };
                            sendJSONresponse(res, 200, response);
                        }
                    } else {
                        sendJSONresponse(res, 404, {
                            "message": "No comments found"
                        });
                    }
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, appointmentid and commentid are both required"
        });
    }
};

//
module.exports.appointmentCommentsDeleteOne = function(req, res) {
    if (!req.params.appointmentid || !req.params.commentid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, appointmentid and commentid are both required"
        });
        return;
    }
    Appoint
        .findById(req.params.appointmentid)
        .select('comments')
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
                if (appointment.comments && appointment.comments.length > 0) {
                    if (!appointment.comments.id(req.params.commentid)) {
                        sendJSONresponse(res, 404, {
                            "message": "commentid not found"
                        });
                    } else {
                        appointment.comments.id(req.params.commentid).remove();
                        appointment.save(function(err) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                sendJSONresponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No comment to delete"
                    });
                }
            }
        );
};
