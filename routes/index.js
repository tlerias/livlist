process.env.TMPDIR = 'tmp';

var express = require('express'),
    router = express.Router(),
    // mongoose = require('mongoose'),
    // Card = mongoose.model('Card');
    models = require('../models'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    flow = require('./flow-node')('tmp'),
    AWS = require('aws-sdk'),
    fs = require('fs');

//AWS.config.loadFromPath('config/aws.json');
var config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: 'us-east-1'
});

AWS.config.update(config);


var ObjectId = require('mongoose').Types.ObjectId;

router.get('/cards/:id', function(req, res) {
  var id = req.params.id;
  models.User.find({_id: id}, function(err, user) {
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

  var c = new models.Card({ "title": title, "content":content, tags: tags, showEdit: false, owners: owners, image: image});
  c.save(function(err, newCard) {
    if(err) return console.log(err);
    models.User.update({"_id": owner}, {$push: {"cards": newCard._id}}, function(err, doc) {
      res.json(newCard, 200);
    });
  });
});

router.get('/card/:id/edit', function(req, res) {
  var id = req.params.id;
  console.log("edit id: " + id);
  models.Card.findById(id, function(err,card) {
    if(err) throw err;
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
  models.User.update({"_id": uId}, {$pullAll: {"cards": postIds}}, function(err,doc){
    if(err) console.log(err)
    models.User.update({"_id": uId}, {"doneCards": postIds}, function(err,doc){
    if(err) console.log(err);
    res.send(200);
    });
  });
});

router.post('/main/:userId', function(req, res) {
  console.log("in main route");
  var posts = req.body.posts;
  var uId = req.params.userId;
  var postIds = [];
  for (var i = 0; i < posts.length; i++){
    postIds.push(ObjectId(posts[i]._id));
  }

  models.User.update({"_id": uId}, {$pullAll: {"doneCards": postIds}}, function(err,doc){
    if(err) console.log(err)
    models.User.update({"_id": uId}, {"cards": postIds}, function(err,doc){
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

router.get('/fileUpload', function(req, res) {
  flow.get(req, function(status, filename, original_filename, identifier) {
        console.log('GET', status);
        res.send(200, (status == 'found' ? 200 : 404));
    });
});

router.post('/fileUpload', multipartMiddleware, function(req, res) {
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log("status: "+ status, filename, original_filename, identifier);
    if(status === "done"){
      var stream = fs.createWriteStream("tmp/" + filename);
      stream.on('finish', function() {
        console.log("stream ended");

        var s3 = new AWS.S3();
        fs.readFile('tmp/'+filename, function(error, file) {
          if(error) { console.log("read error:", error);}
          var base64data = new Buffer(file, 'binary');
          console.log("file", file);
          console.log(filename);
          var params = {Bucket: 'LivelyList', Key: filename, Body: base64data};
          s3.putObject(params, function(err, data) {
            if (err) {
              console.log("err", err)
            } else {
                console.log(data);
                console.log("Successfully uploaded data to LivelyList Bucket");
                res.send(200, {
                // NOTE: Uncomment this funciton to enable cross-domain request.
                //'Access-Control-Allow-Origin': '*'
                });
              }
          });
        });

      });
      flow.write(identifier, stream, {end: true});
    }

  });
});

router.get('/download/:identifier', function(req, res) {
    flow.write(req.params.identifier, res);
});

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});


module.exports = router;
