var mongoose = require('mongoose');

var appointmentCommentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    commentText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var addressSchema = new mongoose.Schema({
  street: String,
  region: String
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  doctor: {type: String},
  phoneNumber: String,
  address: [addressSchema],
});

var appointmentSchema = new mongoose.Schema({
  reason: {type: String, required: true},
  location: [locationSchema],
  residentGoing: {type: String, required: true},
  time: {type: Date, required: true},
  transportation: {type: String, "default": 'The Bridge at Alamosa'},
  accompaniedBy: [String],
  comments: [appointmentCommentSchema]
});

mongoose.model('Appointment', appointmentSchema);

/* adding documents to mongodb
db.appointment.save({

})
*/
