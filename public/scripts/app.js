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

  window.routes = {
    '/login': {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      requireLogin: false,
      showNewButton: false
    },
    '/signup': {
      templateUrl: 'views/signup.html',
      controller: 'LoginCtrl',
      requireLogin: false,
      showNewButton: false
    },
    '/cards': {
      templateUrl:'../views/main.html',
      controller: 'CardCtrl',
      requireLogin: true,
      showNewButton: true
    },
    '/card/:id/edit': {
      templateUrl:'../views/edit.html',
      controller: 'editCardCtrl',
      requireLogin: true,
      showNewButton: false
    },
    '/card/:id': {
      templateUrl:'../views/show.html',
      controller: 'CardCtrl',
      requireLogin: true,
      showNewButton: false
    }
  };

app.config(function ($routeProvider, $locationProvider, $httpProvider){

  // //================================================
  //   // Check if the user is connected
  //   //================================================
  //   var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
  //     // Initialize a new promise
  //     var deferred = $q.defer();

  //     // Make an AJAX call to check if the user is logged in
  //     $http.get('/loggedin').success(function(user){
  //       // Authenticated
  //       console.log("logged in is true");
  //       if (user !== '0')
  //         $timeout(deferred.resolve, 0);

  //       // Not Authenticated
  //       else {
  //         $timeout(function(){deferred.reject();}, 0);
  //         $location.url('/login');
  //       }
  //     });

  //     return deferred.promise;
  //   };
    // //================================================

    // //================================================
    // // Add an interceptor for AJAX errors
    // //================================================
    // $httpProvider.responseInterceptors.push(function($q, $location) {
    //   return function(promise) {
    //     return promise.then(
    //       // Success: just return the response
    //       function(response){
    //         return response;
    //       },
    //       // Error: check the error status to get only the 401
    //       function(response) {
    //         if (response.status === 401)
    //           $location.url('/login');
    //         return $q.reject(response);
    //       }
    //     );
    //   }
    // });

    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: '/cards'});

  });

app.run(function($rootScope, $location, User){

  $rootScope.$on("$locationChangeStart", function(event, next, current) {
    for(var i in window.routes) {
      if(next.indexOf(i) != -1) {
        if(window.routes[i].requireLogin && !User.getUserAuthenticated()) {
            $location.url('/login');
        }
      }
    }
  });
});




app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.run(function($rootScope, $cookieStore, $location, $http, User){
  $rootScope.message = '';

  // Logout function is available in any pages
  $rootScope.logout = function(u){
    $rootScope.message = "You're logged out.";
    $cookieStore.remove('user');
    User.setUserAuthenticated(false);
    $http.get('/logout').success(function(){
      $location.url('/login');
    });
  };
});

app.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'fileUpload',
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

