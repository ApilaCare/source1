var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  reason: {type: String, required: true},
  locationName: {type: String, required: true},
  residentGoing: {type: String, required: true},
  time: {type: Date, required: true},
  transportation: {type: String, default: 'We are Transporting'},
  cancel: {type: Boolean, default: false},
  submitDate: {type: Date, default: Date.now, required: true},
  submitBy: {type: String, required: true}
});

mongoose.model('Appointment', appointmentSchema);

/* adding documents to mongodb
db.appointments.save({

})
*/
