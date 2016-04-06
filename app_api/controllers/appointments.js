var mongoose = require('mongoose');
var Appoint = mongoose.model('Appointment');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST /api/appointments/new */
module.exports.appointmentsCreate = function (req, res) {
  
  //here we join the date&time that the user selected from the date&time pickers
  var d = new Date(req.body.date);
  var t = new Date(req.body.time);

  d.setHours(t.getHours());
  d.setMinutes(t.getMinutes());
  d.setSeconds(t.getSeconds());

  //create appointment from the inputed data
  Appoint.create({
    reason: req.body.reason,
    location: [{
      name: req.body.location.name,
      doctor: req.body.location.doctor,
      phoneNumber: req.body.location.phone,
      address: req.body.location.address
    }],
    residentGoing: req.body.residentGoing,
    time: req.body.date,
    submitBy: req.payload.name,
  }, function(err, appointment) {      
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(appointment);
      sendJSONresponse(res, 201, appointment);
    }
  });
};

/* GET list of appointments */
module.exports.appointmentsList = function(req, res) {
  Appoint.find({
  }, function(err, appointments){
       console.log(appointments);
       sendJSONresponse(res, 200, appointments)
  });
};

module.exports.appointmentsReadOne = function (req, res) {
  console.log('Finding appointment details', req.params);
  if (req.params && req.params.appointmentid) {
    Appoint
      .findById(req.params.appointmentid)
      .exec(function(err, appointment) {
        if (!appointment) {
          sendJSONresponse(res, 404, {
            "message": "appointmentid not found"
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
    .select('-comments')
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
        appointment.reason = req.body.reason,
        appointment.location = {
          name: req.body.name,
          doctor: req.body.doctor,
          phoneNumber: req.body.phoneNumber,
          address: {
            street: req.body.street,
            region: req.body.region,
          },
        },
        appointment.residentGoing = req.body.residentGoing,
        appointment.time = req.body.time,
        appointment.transportation = req.body.transportation,
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

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  // validate that JWT information is on request object
  if (req.payload.email) {
    User
      // user email address to find user
      .findOne({ email : req.payload.email })
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
