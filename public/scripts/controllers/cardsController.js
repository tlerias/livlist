'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, Card){
  $scope.cards = [];
  $scope.dropContainer = [];
  $scope.questionText = "";
  $scope.descriptionText = "";
  $scope.showForm = false;
  console.log("Drop Container: " + $scope.dropContainer);

  Card.getCards().then(function(promise) {

    $scope.cards = promise.data;
  });

  $scope.addCard = function() {
    console.log('in the controller, creating a card');
    Card.create($scope.questionText, $scope.descriptionText).then(function(promise) {
        $scope.cards.unshift(promise.data);
        $scope.questionText = '';
        $scope.descriptionText = '';
      });
  };

  $scope.addCardForm = function() {
    $scope.showForm = !$scope.showForm;
  };

});
