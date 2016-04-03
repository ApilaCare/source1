var mongoose = require('mongoose');

var appointmentCommentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    commentText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  doctor: {type: String, default: '1'},
  phoneNumber: {type: String, default: '2'},
  address: {type: String, default: '3'},
});

var appointmentSchema = new mongoose.Schema({
  reason: {type: String, required: true},
  location: [locationSchema],
  residentGoing: {type: String, required: true},
  time: {type: Date, required: true},
  transportation: {type: String, default: 'guitarist'},
  comments: [appointmentCommentSchema],
  submitDate: {type: Date, default: Date.now}
});

mongoose.model('Appointment', appointmentSchema);

/* adding documents to mongodb
db.appointment.save({

})
*/
