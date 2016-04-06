var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  doctor: {type: String},
  phoneNumber: {type: String},
  address: {type: String},
});

var appointmentSchema = new mongoose.Schema({
  reason: {type: String, required: true},
  location: [locationSchema],
  residentGoing: {type: String, required: true},
  time: {type: Date, required: true},
  transportation: {type: String, default: 'We are Transporting'},
  submitDate: {type: Date, default: Date.now, required: true},
  submitBy: {type: String, required: true}
});

mongoose.model('Appointment', appointmentSchema);

/* adding documents to mongodb
db.appointments.save({

})
*/
