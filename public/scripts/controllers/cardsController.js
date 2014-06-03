'use strict';


angular.module('livLustApp').controller('CardCtrl', function($scope){
  $scope.question_text = "";
  $scope.description_text = "";

  $scope.addCard = function() {
    console.log("hi");
    $scope.question_text = "";
    $scope.description_text = "";
  };

});
