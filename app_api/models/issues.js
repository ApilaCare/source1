var mongoose = require('mongoose');

var issueCommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    responsibleParty: {
        type: String,
        required: true
    },
    resolutionTimeframe: {
        type: String,
        required: true
    },
    submitDate: {
        type: Date,
        default: Date.now
    },
    submitBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [issueCommentSchema],
    updateInfo: [mongoose.Schema.Types.Mixed]
});

mongoose.model('Issue', issueSchema);

/* adding documents to mongodb
db.issues.save({

})
*/
