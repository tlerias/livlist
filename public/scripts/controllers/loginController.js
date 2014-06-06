'use strict';


angular.module('livListApp').controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
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
      $rootScope.current_user = user;
      $location.url('/cards');
    })
    .error(function(err){
      // Error: authentication failed
      $rootScope.message = err;
      $location.url('/login');
    });
  };

  // Register the signup() function
  $scope.signup = function(){
    $http.post('/signup', {
      email: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      console.log("signup came back: " + JSON.stringify(user));
      $rootScope.message = 'SignUp successful!';
      //$location.url('/cards');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Sign up failed.';
      $location.url('/login');
    });
  };
});
