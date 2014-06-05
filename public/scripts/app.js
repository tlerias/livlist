'use strict';

var app = angular.module('livListApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngDragDrop',
  'ngTagsInput'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/', {
        templateUrl:'../views/main.html',
        controller: 'CardCtrl'
      });

  });
