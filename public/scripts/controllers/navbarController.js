'use strict';


angular.module('livListApp').controller('navCtrl', function($scope, $rootScope, $cookieStore, $location){
  $rootScope.showForm = {form: false};
  $scope.currentUser = $cookieStore.get('user');
  $scope.urlPath = $location.path();


$scope.$on('$locationChangeStart', function(event) {
  $scope.urlPath = $location.path();
   console.log('in navbar controller, checking path: '+ $scope.urlPath);
   if($scope.urlPath === '/cards'){
    $scope.hideNewCardButton = true;
   } else {
    $scope.hideNewCardButton = false;
   }

});


  $rootScope.addCardForm = function() {
    $scope.showForm.form = !$scope.showForm.form;
  };

  // $scope.checkCurrentUser = function(){
  //   if (typeof $scope.currentUser !== "undefined"){
  //     console.log($scope.currentUser);
  //     return true;
  //   }
  //   return false;
  // }


  $scope.$on('$routeChangeStart', function (next, current) {
    // console.log('next:' + JSON.stringify(next));
    // console.log('current:' + current)
      if(typeof $cookieStore.get('user') !== 'undefined'){
        $rootScope.userIsLoggedIn = true;
      } else {
        $rootScope.userIsLoggedIn = false;
      }
  });

});
