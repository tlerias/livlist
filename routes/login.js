var express = require('express');
var router = express.Router();
var passport = require('passport');

//show the login form
// router.get('/', function(req, res) {
//   //renders the page and passes in any flash message data (for potential errors) if it exists
//   res.render('login', {message: req.flash('loginMessage')});
// });


// route to log in

router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    console.log("info", info);
    console.log(user)
    if (err) { return next(err); }
    if (!user) { return res.send(401, info.message) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }

      return res.json(200, req.user);
    });
  })(req, res, next);

});


// router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
// router.get('/auth/facebook/callback', function(req, res, next){
//   passport.authenticate('facebook', function(err, user){
  //   console.log(JSON.stringify(req.user));
  //   if (err) { return next(err); }
  //   if (!user) { return res.send(401) }
  //   req.logIn(user, function(err) {
  //     if (err) { return next(err); }
  //      res.redirect('/');
  //    });
  // });
//});

module.exports = router;
