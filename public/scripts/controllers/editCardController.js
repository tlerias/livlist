'use strict';


angular.module('livListApp').controller('editCardCtrl', function($scope, $routeParams, Card){
  var id = $routeParams.id;

  Card.find(id).then(function(promise) {
    console.log("got the card edit data: " + promise.data);
    console.log("title: " + promise.data.title)
    $scope.currentCard = promise.data;
    console.log("end of edit card" + currentCard);
  });
});
