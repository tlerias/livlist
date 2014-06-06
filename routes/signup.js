var express = require('express');
var router = express.Router();
var passport = require('passport');

//show the signup form
// router.get('/', function(req, res) {
//   //renders the page and passes in any flash data if it exists
//   res.render('signup.html', {message: req.flash('signupMessage')});
// });


router.post('/', function(req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if(err) { return next(err); }
    res.send(200, user);
  })(req, res, next);

});
module.exports = router;
