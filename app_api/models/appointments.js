var mongoose = require('mongoose');

var appointmentCommentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    commentText: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}
});


var appointmentSchema = new mongoose.Schema({
  reason: {type: String, required: true},
  locationName: {type: String, required: true},
  locationDoctor: {type: String, default: ''},
 // residentGoing: {type: String, default: ''},  // _ui of resident from resident model
  residentGoing: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
  time: {type: Date, required: true},
  transportation: {type: String, default: 'We are Transporting'},
  cancel: {type: Boolean, default: false},
  appointmentComment: [appointmentCommentSchema],
  submitDate: {type: Date, default: Date.now, required: true},
  submitBy: {type: String, required: true},
  updateInfo: [mongoose.Schema.Types.Mixed],
});

mongoose.model('Appointment', appointmentSchema);

/* adding documents to mongodb
db.appointments.save({

})
*/
