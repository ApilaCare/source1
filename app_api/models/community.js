var mongoose = require('mongoose');

var communitySchema = new mongoose.Schema({
  name: {type: String, required: true},
  // some image type.  Buffer?
  appointmentImage: {type: Buffer, required: true},
});

mongoose.model('Community', communitySchema);
