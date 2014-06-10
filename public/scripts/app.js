'use strict';

var app = angular.module('livListApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngDragDrop',
  'ngTagsInput',
  'xeditable',
  'flow'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){

  //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });
    //================================================

    //================================================
    // Define all the routes
    //================================================
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'LoginCtrl'
      })
      .when('/cards', {
        templateUrl:'../views/main.html',
        controller: 'CardCtrl'
      })
      .when('/card/:id/edit', {
        templateUrl:'../views/edit.html',
        controller: 'editCardCtrl'
      })
      .when('/card/:id', {
        templateUrl:'../views/show.html',
        controller: 'CardCtrl'
      });

  });

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.run(function($rootScope, $http){
  $rootScope.message = '';

  // Logout function is available in any pages
  $rootScope.logout = function(){
    $rootScope.message = 'Logged out.';
    $http.post('/logout');
  };
});

app.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    //target: 'upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4,
    singleFile: true
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);
