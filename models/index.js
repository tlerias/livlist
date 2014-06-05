var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/livlust');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var CardSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  showEdit: Boolean,
  create_date: {type: Date, default: Date.now}

});

var Card = mongoose.model('Card', CardSchema);
module.exports = { "Card": Card };
