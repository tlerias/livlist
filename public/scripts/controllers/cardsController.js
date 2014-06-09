'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, $location, $rootScope, $cookieStore, Card){
  $scope.cards = [];
  $scope.dropContainer = [];
  $scope.titleText = "";
  $scope.descriptionText = "";
  $scope.tagsText = [];
  $scope.user = $cookieStore.get('user');

  $scope.$watchCollection('dropContainer', function(newlyDoneCards, oldDoneCards){
    console.log("cards: " + newlyDoneCards[-1]._id);
    console.log("uId: " + $scope.user._id);
    Card.updateDone(newlyDoneCards[-1]._id, $scope.user._id).then(function(promise) {
      console.log("done done")
    })
  });


  Card.getCards($scope.user._id).then(function(promise) {
    $scope.cards = promise.data;
  });

  $scope.addCard = function() {
    Card.create($scope.titleText, $scope.descriptionText, $scope.tagsText, [$scope.user._id]).then(function(promise) {

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
      Card.getCards($scope.user._id).then(function(promise) {
        $scope.cards = promise.data;
      });
    });
  }
  $scope.logout = function() {
    Card.logout().then(function(promise) {
      $cookieStore.remove('user');
      $rootScope.message = 'Logged out!';
      $location.url('/login');
    });
  }




});
