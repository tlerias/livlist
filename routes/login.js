var express = require('express');
var router = express.Router();
var passport = require('passport');

//show the login form
// router.get('/', function(req, res) {
//   //renders the page and passes in any flash message data (for potential errors) if it exists
//   res.render('login', {message: req.flash('loginMessage')});
// });


router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in

router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    console.log("info", info);
    if (err) { return next(err); }
    if (!user) { return res.send(401, info.error) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }

      return res.json(200, req.user);
    });
  })(req, res, next);

});

module.exports = router;
