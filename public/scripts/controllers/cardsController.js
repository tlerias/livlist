'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, $location, Card){
  $scope.cards = [];
  $scope.dropContainer = [];
  $scope.titleText = "";
  $scope.descriptionText = "";
  $scope.tagsText = [];
  console.log("Drop Container: " + $scope.dropContainer);

  Card.getCards().then(function(promise) {

    $scope.cards = promise.data;
  });

  $scope.addCard = function() {
    console.log('in the controller, creating a card');
    console.log('tags: ' + $scope.tagsText);
    Card.create($scope.titleText, $scope.descriptionText, $scope.tagsText).then(function(promise) {
        $scope.cards.unshift(promise.data);
        $scope.titleText = '';
        $scope.descriptionText = '';
        $scope.tagsText = [];
        $scope.showForm.form = false;
      });
  };

  $scope.hover = function(item) {
    return item.showEdit = !item.showEdit;
  };

  $scope.goEdit = function (path) {
    $location.path('/card/'+path+'/edit');
  };

  $scope.deleteCard = function(id) {
    Card.delete(id).then(function(promise) {
      Card.getCards().then(function(promise) {
        $scope.cards = promise.data;
      });
    });
  }


});
