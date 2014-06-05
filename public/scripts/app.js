'use strict';

var app = angular.module('livListApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngDragDrop',
  'ngTagsInput',
  'xeditable'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/', {
        templateUrl:'../views/main.html',
        controller: 'CardCtrl'
      })
      .when('/card/:id/edit', {
        templateUrl:'../views/edit.html',
        controller: 'editCardCtrl'
      });

  });

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
