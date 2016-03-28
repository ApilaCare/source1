var mongoose = require('mongoose');
var Iss = mongoose.model('Issue');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.issuesCreate = function (req, res) {
  console.log(req.body);
  Iss.create({
    title: req.body.title,
    responsibleParty: req.body.responsibleParty,
    resolutionTimeframe: req.body.resolutionTimeframe,
    submitTime: req.body.submitTime,
    submitBy: req.body.submitBy,
    description: req.body.description,
  }, function(err, issue) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(issue);
      sendJSONresponse(res, 201, issue);
    }
  });
};

/* GET list of issues */
module.exports.issuesList = function(req, res) {
  Iss.find({
  }, function(err, issues){
       console.log(issues);
       sendJSONresponse(res, 200, issues)
  });
};

module.exports.issuesReadOne = function (req, res) {
  console.log('Finding issue details', req.params);
  if (req.params && req.params.issueid) {
    Iss
      .findById(req.params.issueid)
      .exec(function(err, issue) {
        if (!issue) {
          sendJSONresponse(res, 404, {
            "message": "issueid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(issue);
        sendJSONresponse(res, 200, issue);
      });
  } else {
    console.log('No issueid specified');
    sendJSONresponse(res, 404, {
      "message": "No issueid in request"
    });
  }
};

/* PUT /api/issue/:issueid */
module.exports.issuesUpdateOne = function(req, res) {
  if (!req.params.issueid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, issueid is required"
    });
    return;
  }
  Iss
    .findById(req.params.issueid)
    .select('-comments')
    .exec(
      function(err, issue) {
        if (!issue) {
          sendJSONresponse(res, 404, {
            "message": "issueid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        issue.title = req.body.title;
        issue.responsibleParty = req.body.responsibleParty;
        issue.resolutionTimeframe = req.body.resolutionTimeframe;
        issue.submitTime = req.body.submitTime;
        issue.submitBy = req.body.submitBy;
        issue.description = req.body.description;
        issue.save(function(err, issue) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, issue);
          }
        });
      }
  );
};

/* DELETE /api/issue/:issueid */
module.exports.issuesDeleteOne = function(req, res) {
  var issueid = req.params.issueid;
  if (issueid) {
    Iss
      .findByIdAndRemove(issueid)
      .exec(
        function(err, issue) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("issue id " + issueid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No issueid"
    });
  }
};

/* adding documents to mongodb
db.issues.save({
  title: 'It fell down, hard',
  responsibleParty: 'Carol Riggen',
  resolutionTimeframe: 'Weeks',
  submitTime: new Date('March 6, 2016'),
  submitBy: 'LindaFlower',
  description: 'One more silly issue to never ever resolve',
})
*/
