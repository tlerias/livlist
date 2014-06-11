'use strict';


angular.module('livListApp').controller('formCtrl', function($scope, $location, $rootScope, $cookieStore, Card){
  $scope.titleText = "";
  $scope.imgUrl = "";
  $scope.descriptionText = "";
  $scope.tagsText = [];


  $scope.addCard = function(form, name) {
    if (name === undefined){
      $scope.imgUrl = "http://s3.amazonaws.com/LivelyList/placeholder.jpg";
    } else {
      $scope.imgUrl = "http://s3.amazonaws.com/LivelyList/"+name;
    }
    if($scope.titleText === ""){
      console.log("text is empty: "+true)
      $scope.titleText = "Untitled";
    }
    Card.create($scope.titleText, $scope.descriptionText, $scope.tagsText, [$scope.user._id], $scope.imgUrl).then(function(promise) {
      console.log("hello");
        $scope.cards.unshift(promise.data);
        console.log("added cards: " + $scope.cards);
        clearAll();
      });
  };


  var clearAll = function(){
    console.log("clear all has been called")
    console.log("titletext" + $scope.titleText);

    $scope.titleText = '';
    console.log("titletext" + $scope.titleText);
    $scope.imgUrl = '';
    $scope.descriptionText = '';
    $scope.tagsText = [];
    $scope.showForm.form = false;
  }





});
