var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/personalProj');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var CardSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  showEdit: Boolean,
  create_date: {type: Date, default: Date.now},
  owners: Array

});

var UserSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  local            : {
      email        : String,
      password     : String
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }
});

//methods =====
//generating a password hash

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);
var Card = mongoose.model('Card', CardSchema);
module.exports = { "Card": Card, "User": User };
