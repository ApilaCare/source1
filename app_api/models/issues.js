var mongoose = require('mongoose');

var issueCommentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    commentText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var issueSchema = new mongoose.Schema({
  title: {type: String, required: true},
  responsibleParty: {type: String, required: true},
  resolutionTimeframe: {type: String, required: true},
  submitTime: {type: Date, "default": Date.now},
  submitBy: {type: String, required: true},
  description: {type: String, required: true},
  comments: [issueCommentSchema]
});

mongoose.model('Issue', issueSchema);

/* adding documents to mongodb
db.locations.save({
      name: 'Jacks Market',
      address: '222 Solar Ave, Monte Vista, CO 81144',
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: [-106.162324,37.579226],
      openingTimes: [{
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
      }, {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
      }, {
          days: 'Sunday',
          closed: true
      }]
})
*/
