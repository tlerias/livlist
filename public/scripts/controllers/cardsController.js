'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, Card){
  $scope.cards = [];
  $scope.question_text = "";
  $scope.description_text = "";

  Card.getCards().then(function(promise) {

    $scope.cards = promise.data;
  });

  $scope.addCard = function() {
    console.log("in the controller, creating a card");
    Card.create($scope.question_text, $scope.description_text)
    $scope.question_text = "";
    $scope.description_text = "";
  };

});
