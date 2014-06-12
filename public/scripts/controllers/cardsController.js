'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, $location, $rootScope, $cookieStore, User, Card){
  $scope.cards = [];
  $scope.dropContainer = [];
  $scope.user = $cookieStore.get('user');
  $scope.querySearch = "";
  $scope.currentCard = $cookieStore.get('card');

  $scope.onDragFromDone = function(){
    $('.acceptContainer').addClass('ng-show');
    $('.acceptContainer').removeClass('ng-hide');
  }
  $scope.onStopFromDone = function(){
    $('.acceptContainer').addClass('ng-hide');
    $('.acceptContainer').removeClass('ng-show');
    console.log('dragging')


  }

  $scope.onDragToDone = function(){
    $('.dropToDone').addClass('ng-show');
    $('.dropToDone').removeClass('ng-hide');
  }
  $scope.onStopToDone = function(){
    $('.dropToDone').addClass('ng-hide');
    $('.dropToDone').removeClass('ng-show');
  }

  $scope.checkIfShow = function(){
   return $('.acceptContainer').hasClass('ng-show') || $('.dropToDone').hasClass('ng-show')
  }


  Card.getCards($scope.user._id).then(function(promise) {
    console.log(JSON.stringify(promise));
    $scope.cards = promise.data.cards;
    $scope.dropContainer = promise.data.doneCards;
  });


  $scope.$watchCollection('dropContainer', function(newlyDoneCards, oldDoneCards){
    if (newlyDoneCards === oldDoneCards){ return }
      console.log(newlyDoneCards);
      Card.updateDone(newlyDoneCards, $scope.user._id).then(function(promise) {
       });
  });
  $scope.$watchCollection('cards', function(newCards, oldCards){
    if (newCards === oldCards){ return }
      Card.updateMainCards(newCards, $scope.user._id).then(function(promise) {
       });
  });


  $scope.hover = function(item) {
    return item.showEdit = !item.showEdit;
  };

  $scope.goEdit = function (path) {
    $location.path('/card/'+path+'/edit');
  };

  $scope.deleteCard = function(id) {
    Card.delete(id).then(function(promise) {
      Card.getCards($scope.user._id).then(function(promise) {
        $scope.cards = promise.data.cards;
        $scope.dropContainer = promise.data.doneCards;
      });
    });
  }
  $scope.logout = function() {
    Card.logout().then(function(promise) {
      $cookieStore.remove('user');
      $rootScope.message = 'Logged out!';
      User.setUserAuthenticated(false);
      $location.url('/login');
    });
  }

  $scope.changeFilter = function(tag) {
    $scope.querySearch = tag;
  }

  $scope.goToCard = function(id) {
    $cookieStore.remove("card");
    console.log("cookie store: " + $cookieStore.get('card'))
    $location.path('/card/'+id);
    for(var i = 0; i < $scope.cards.length; i++){
      if($scope.cards[i]._id === id){
        console.log("found it!");
        $cookieStore.put("card", $scope.cards[i]);
      }
    }
  }

  $scope.goBack = function () {
    $location.path('/cards');
  };

  $scope.jumpCard = function(){
    $rootScope.addCardForm();
    $location.hash('newCForm');


  }







});
