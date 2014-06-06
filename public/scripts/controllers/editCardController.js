'use strict';


angular.module('livListApp').controller('editCardCtrl', function($scope, $routeParams, $location, Card){
  var id = $routeParams.id;

  Card.find(id).then(function(promise) {
    console.log("got the card edit data: " + promise.data);
    $scope.currentCard = promise.data;
  });


  $scope.editCard = function() {
    console.log('editing card');
   Card.update($scope.currentCard.title, $scope.currentCard.content, $scope.currentCard.tags, id).then(function(promise) {
    $location.path('/');
    });
 };
});
