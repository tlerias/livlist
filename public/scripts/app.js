'use strict';

var app = angular.module('livLustApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/', {
        templateUrl:'../views/main.html',
        controller: 'CardCtrl'
      });

  });
