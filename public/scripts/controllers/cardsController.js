'use strict';


angular.module('livListApp').controller('CardCtrl', function($scope, $location, $rootScope, $cookieStore, Card){
  $scope.cards = [];
  $scope.dropContainer = [];
  $scope.titleText = "";
  $scope.imgUrl = "";
  $scope.descriptionText = "";
  $scope.tagsText = [];
  $scope.user = $cookieStore.get('user');
  $scope.querySearch = "";
  $scope.currentCard = $cookieStore.get('card');



  Card.getCards($scope.user._id).then(function(promise) {
    console.log(JSON.stringify(promise));
    $scope.cards = promise.data.cards;
    $scope.dropContainer = promise.data.doneCards;
  });


  $scope.$watchCollection('dropContainer', function(newlyDoneCards, oldDoneCards){
    if (newlyDoneCards === oldDoneCards){ return }
      console.log(newlyDoneCards);
      Card.updateDone(newlyDoneCards, $scope.user._id).then(function(promise) {
         console.log("done done");
       });
  });


  $scope.addCard = function() {
    console.log("adding card in controller, image: " + $scope.imgUrl)
    Card.create($scope.titleText, $scope.descriptionText, $scope.tagsText, [$scope.user._id], $scope.imgUrl).then(function(promise) {

        $scope.cards.unshift(promise.data);
        $scope.titleText = '';
        $scope.imgUrl = '';
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
        $scope.cards = promise.data.cards;
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




});
