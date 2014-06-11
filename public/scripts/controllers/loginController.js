'use strict';


angular.module('livListApp').controller('LoginCtrl', function($scope, $rootScope, $http, $location, $cookieStore, User) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      email: $scope.user.username,
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
    $http.post('/signup', {
      email: $scope.user.username,
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
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Sign up failed.';
       User.setUserAuthenticated(false);
      $location.url('/login');
    });
  };

  $scope.go = function(path){
    $location.url(path);
  }
});
