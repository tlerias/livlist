'use strict';


angular.module('livListApp').controller('editCardCtrl', function($scope, $routeParams, $location, Card){});

angular.module('livListApp').controller('editCardFormCtrl', function($scope, $routeParams, $location, Card){
  var id = $routeParams.id;

  Card.find(id).then(function(promise) {
    $scope.currentCard = promise.data;
  });

  $scope.editCard = function(form, name) {
    if (name === undefined){
      $scope.currentCard.image = "http://s3.amazonaws.com/LivelyList/placeholder.jpg";
    } else {
      $scope.currentCard.image = "http://s3.amazonaws.com/LivelyList/"+name;
    }
    if($scope.titleText === ""){
      console.log("text is empty: "+true)
      $scope.titleText = "Untitled";
    }
    console.log('editing card');
    Card.update($scope.currentCard.title, $scope.currentCard.content, $scope.currentCard.tags, $scope.currentCard.image, id).then(function(promise) {
    $location.path('/cards');
    });
  };
});

