var express = require('express'),
    router = express.Router(),
    // mongoose = require('mongoose'),
    // Card = mongoose.model('Card');
    models = require('../models');

var ObjectId = require('mongoose').Types.ObjectId;

router.get('/cards/:id', function(req, res) {
  var id = req.params.id;
  console.log("getting cards for user id: " + id);
  models.User.find({_id: id}, function(err, user) {
    console.log(JSON.stringify(user));
    console.log("user cards log: " + user[0].cards)
    models.Card.find({_id: {$in: user[0].cards}}, function(err, cards) {

      models.Card.find({_id: {$in: user[0].doneCards}}, function(err, doneCards) {
        if(err) throw err;
        console.log("express route, getting cards: " + cards);
        res.json({cards: cards, doneCards: doneCards}, 200);
      });
    });
  });
});

router.post('/add', function(req, res) {
  console.log("in express:" + req.body.title);
  var title = req.body.title,
      content = req.body.description,
      tags = req.body.tags,
      owners = req.body.owners,
      image = req.body.image,
      owner = req.body.owners.toString();
      console.log("image: " + image);
      console.log("owner: " + owner);
      console.log('express tags: ' + tags);

  var c = new models.Card({ "title": title, "content":content, tags: tags, showEdit: false, owners: owners, image: image});
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

router.post('/done/:userId', function(req, res) {
  console.log("in done route");
  var posts = req.body.posts;
  var uId = req.params.userId;
  var postIds = [];
  for (var i = 0; i < posts.length; i++){
    postIds.push(ObjectId(posts[i]._id));
  }
  console.log("posts: " + JSON.stringify(postIds));
  console.log("user: " + uId);
  models.User.update({"_id": uId}, {$pullAll: {"cards": postIds}}, function(err,doc){
    if(err) console.log(err)
    models.User.update({"_id": uId}, {"doneCards": postIds}, function(err,doc){
    if(err) console.log(err);
    res.send(200);
    });
  });
});

router.post('/card/:id/edit_submit', function(req, res) {
    var new_title = req.body.title, new_body = req.body.description, new_tags = req.body.tags, new_image = req.body.image, id = req.params.id;
    models.Card.findByIdAndUpdate(id, {title: new_title, content: new_body, tags: new_tags, image: new_image}, function(err, card) {
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
