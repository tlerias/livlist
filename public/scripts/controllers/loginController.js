'use strict';


angular.module('livListApp').controller('LoginCtrl', function($scope, $rootScope, $http, $location, $cookieStore, User) {
  // This object will be filled by the form
  $scope.user = {};
  $rootScope.message = "";

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      email: $scope.user.username.toLowerCase(),
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $cookieStore.put('user', user);
      User.setUserAuthenticated(true);
      console.log("authentication: " + User.getUserAuthenticated())
      $location.url('/cards');
    })
    .error(function(err){
      // Error: authentication failed
      $rootScope.message = err;
      $cookieStore.remove('user');
      User.setUserAuthenticated(false);
      $location.url('/login');
    });
  };

  // $scope.loginFacebook = function(){
  //   $http.get('/login/auth/facebook')
  //   .success(function(user){
  //     // No error: authentication OK
  //     $rootScope.message = 'Authentication successful!';
  //     $cookieStore.put('user', user);
  //     User.setUserAuthenticated(true);
  //     $location.url('/cards');
  //   })
  //   .error(function(err){
  //     // Error: authentication failed
  //     $rootScope.message = err;
  //     $cookieStore.remove('user');
  //     User.setUserAuthenticated(false);
  //     $location.url('/login');
  //   });
  // };

  // Register the signup() function
  $scope.signup = function(){
    console.log("pass: " + $scope.user.password)
    if($scope.user.password === "" || typeof $scope.user.password === 'undefined' ){
      $rootScope.message = "You must enter a password";
    } else{
        $http.post('/signup', {
        email: $scope.user.username.toLowerCase(),
        password: $scope.user.password,
    })
      .success(function(user){
        // No error: authentication OK
        console.log("signup came back: " + JSON.stringify(user));
        $rootScope.message = 'Sign up successful!';
        User.setUserAuthenticated(true);
        $cookieStore.put('user', user);
        $location.url('/cards');
    })
      .error(function(err){
        // Error: authentication failed
        $rootScope.message = err;
         User.setUserAuthenticated(false);
      });
   }

  };

  $scope.go = function(path){
    $location.url(path);
  }
});
