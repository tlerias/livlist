var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.createConnection('mongodb://localhost/livelist');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var CardSchema = new Schema({
  title: String,
  content: String

});


module.exports = mongoose.model('Card', CardSchema);
