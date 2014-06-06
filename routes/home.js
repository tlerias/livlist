var express = require('express');
var router = express.Router();
var models = require('../models/');

function isLoggedIn(req, res, next){
  // Note that this is a function declaration, NOT an expression.
  // It loads before any code is called--compare this with a function expression.
  // Why did we write this as a declaration?
  // Read more: http://stackoverflow.com/q/1013385/66355
  if (req.isAuthenticated()){
    return next();
  }
  res.send(401);
  res.redirect('/') //if not authenticated, redirect to main page
}

/* GET home page. */
//we want this protected so you have to be logged in to visit
//we'll use route middleware to verify this ()
router.get('/', isLoggedIn, function(req, res) {

  var docs = models.Card.find(function(err, docs) {
    res.json(docs, 401);
  });
});

module.exports = router;
