var express = require('express'),
    router = express.Router(),
    models = require('../models');


router.get('/cards', function(req, res) {
  console.log(models.Card);
  models.Card.find({}, function(err,cards) {
    if(err) throw err;
    console.log("express route: " + cards);
    res.json(cards, 200);
  });
});

router.post('/add', function(req, res) {
  console.log("in express:" + req.body.title);
  var title = req.body.title,
      content = req.body.description;

  var c = new models.Card({ "title": title, "content":content});
  c.save();
  res.json(200);
});

// router.get('*', function(req, res) {
//   res.sendfile('../public/views/index.html');
// });

module.exports = router;
