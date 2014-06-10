'use strict';


angular.module('livListApp').controller('editCardCtrl', function($scope, $routeParams, $location, Card){
  var id = $routeParams.id;

  Card.find(id).then(function(promise) {
    $scope.currentCard = promise.data;
  });


  $scope.editCard = function() {
    console.log('editing card');
   Card.update($scope.currentCard.title, $scope.currentCard.content, $scope.currentCard.tags, $scope.currentCard.image, id).then(function(promise) {
    $location.path('/cards');
    });
 };
});
