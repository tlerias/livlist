var express = require('express'),
    router = express.Router(),
    // mongoose = require('mongoose'),
    // Card = mongoose.model('Card');
    models = require('../models');

router.get('/cards/:id', function(req, res) {
  var id = req.params.id;
  console.log("getting cards for user id: " + id);
  models.User.find({_id: id}, function(err, user) {
    console.log(JSON.stringify(user));
    console.log("user cards log: " + user[0].cards)
    models.Card.find({_id: {$in: user[0].cards}}, function(err, cards) {
    if(err) throw err;
    console.log("express route, getting cards: " + cards);
    res.json(cards, 200);
    });
  });
});

router.post('/add', function(req, res) {
  console.log("in express:" + req.body.title);
  var title = req.body.title,
      content = req.body.description,
      tags = req.body.tags;
      owners = req.body.owners;
      owner = req.body.owners.toString();
      console.log("owner: " + owner)
      console.log('express tags: ' + tags);

  var c = new models.Card({ "title": title, "content":content, tags: tags, showEdit: false, owners: owners});
  c.save(function(err, newCard) {
    if(err) return console.log(err);
    console.log("card id: " + newCard._id)
    models.User.update({"_id": owner}, {$push: {"cards": newCard._id}}, function(err, doc) {
       console.log("route just created a card!: " + JSON.stringify(doc));
      res.json(newCard, 200);
    });
  });
});

router.get('/card/:id/edit', function(req, res) {
  var id = req.params.id;
  console.log("edit id: " + id);
  models.Card.findById(id, function(err,card) {
    if(err) throw err;
    console.log("express get card to edit : " + card);
    res.json(card, 200);
  });
});

router.get('/card/:postId/:userId/done', function(req, res) {
  conesole.log("in done route");
  var pId = req.params.postId;
  var uId = req.params.userId;
  models.User.update({_id: uId}, {$pull: {cards: pId}});
  models.User.update({_id: uId}, {$push: {doneCards: pId}});
  res.send(200);
});

router.post('/card/:id/edit_submit', function(req, res) {
    var new_title = req.body.title, new_body = req.body.description, new_tags = req.body.tags, id = req.params.id;
    models.Card.findByIdAndUpdate(id, {title: new_title, content: new_body, tags: new_tags}, function(err, card) {
    res.send(200);
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
        res.send(200);
      }
    });
});

router.get('/logout', function(req, res){
  req.logout(); //this logout function is provided by passport
  res.send(200);
});

module.exports = router;
