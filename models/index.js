var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/livlust');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var CardSchema = new Schema({
  title: String,
  content: String

});


exports.Card = mongoose.model('Card', CardSchema);
