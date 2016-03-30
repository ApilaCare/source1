var mongoose = require('mongoose');
var Appoint = mongoose.model('Appointment');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.appointmentsCreate = function (req, res) {
  console.log(req.body);
  Appoint.create({
    reason: req.body.reason,
    location: {
      name: req.body.name,
      doctor: req.body.doctor,
      phoneNumber: req.body.phoneNumber,
      address: {
        street: req.body.street,
        region: req.body.region,
      },
    },
    residentGoing: req.body.residentGoing,
    time: req.body.time,
    transportation: req.body.transportation,
    accompaniedBy: req.body.accompaniedBy.split(","),
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
        appointment.accompaniedBy = req.body.accompaniedBy.split(","),
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
