var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);

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
