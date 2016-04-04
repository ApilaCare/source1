var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// user data model
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  // create a random string for salt
  this.salt = crypto.randomBytes(16).toString('hex');
  // create encrypted hash
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  // will have the locally saved JWT expire after 7 days
  expiry.setDate(expiry.getDate() + 7);

  // call jwt.sign method and return what it returns
  return jwt.sign({
    // pass payload to method
    _id: this._id,
    email: this.email,
    name: this.name,
    // include expiration as unix time in seconds
    exp: parseInt(expiry.getTime() / 1000),
    // send secret for hashing algorithim to use
    // JWT_SECRET is defined in .env file in root (included in .gitignore)
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// export mongoose model 
mongoose.model('User', userSchema);
