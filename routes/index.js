var express = require('express'),
    router = express.Router(),
    // mongoose = require('mongoose'),
    // Card = mongoose.model('Card');
    models = require('../models');

router.get('/cards', function(req, res) {
  models.Card.find({}, function(err,cards) {
    if(err) throw err;
    console.log("express route: " + cards);
    res.json(cards, 200);
  });
});

router.post('/add', function(req, res) {
  console.log("in express:" + req.body.title);
  var title = req.body.title,
      content = req.body.description,
      tags = req.body.tags;
      console.log('express tags: ' + tags);

  var c = new models.Card({ "title": title, "content":content, tags: tags, showEdit: false});
  c.save(function(err, newCard) {
    if(err) return console.log(err);
    console.log("route just created a card!: " + newCard)
    res.json(newCard, 200);
  });
});

router.get('/card/:id/edit', function(req, res) {
  console.log("in edit route...");
  var id = req.params.id;
  console.log("edit id: " + id);
  models.Card.findById(id, function(err,card) {
    if(err) throw err;
    console.log("express get card to edit : " + card);
    res.json(card, 200);
  });
});

router.post('/card/:id/edit_submit', function(req, res) {
    var new_title = req.body.title, new_body = req.body.description, new_tags = req.body.tags, id = req.params.id;
    models.Card.findByIdAndUpdate(id, {title: new_title, content: new_body, tags: new_tags}, function(err, card) {
    res.json(200)
    });
});
// router.get('*', function(req, res) {
//   res.sendfile('../public/views/index.html');
// });

router.post('/card/:id/delete', function(req, res) {
    id = req.params.id;
    models.Card.findByIdAndRemove(id, function(err){
      if(err){
        console.log(err.message);
      } else{
        res.json(200);
      }
    });
});

router.get('/logout', function(req, res){
  req.logout(); //this logout function is provided by passport
  res.redirect('/');
});

module.exports = router;
