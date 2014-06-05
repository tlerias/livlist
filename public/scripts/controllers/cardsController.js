'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, Card){
  $scope.cards = [];
  $scope.questionText = "";
  $scope.descriptionText = "";

  Card.getCards().then(function(promise) {

    $scope.cards = promise.data;
  });

  $scope.addCard = function() {
    console.log("in the controller, creating a card");
    Card.create($scope.questionText, $scope.descriptionText);
    $scope.questionText = "";
    $scope.descriptionText = "";
  };

});
