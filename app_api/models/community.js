var mongoose = require('mongoose');

var communitySchema = new mongoose.Schema({
  name: {type: String, required: true},
  appointmentImage: {type: String, required: true},
});

mongoose.model('Community', communitySchema);
