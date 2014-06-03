'use strict';


angular.module('livLustApp').controller('CardCtrl', function($scope, Card){
  $scope.question_text = "";
  $scope.description_text = "";

  $scope.addCard = function() {
    console.log("in the controller, creating a card");
    Card.create("post text")
    $scope.question_text = "";
    $scope.description_text = "";
  };

});
