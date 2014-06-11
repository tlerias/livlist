'use strict';


angular.module('livListApp').controller('navCtrl', function($scope, $rootScope, $cookieStore){
  $scope.showForm = {form: false};
  $scope.currentUser = $cookieStore.get('user');


  $scope.addCardForm = function() {
    $scope.showForm.form = !$scope.showForm.form;
  };

  // $scope.checkCurrentUser = function(){
  //   if (typeof $scope.currentUser !== "undefined"){
  //     console.log($scope.currentUser);
  //     return true;
  //   }
  //   return false;
  // }

  // $scope.$watchCollection('currentUser', function(newIsh, oldIsh){
  //   return $scope.checkCurrentUser()
  // });

  $scope.$on('$routeChangeStart', function (next, current) {

      if(typeof $cookieStore.get('user') !== 'undefined'){
        $rootScope.userIsLoggedIn = true;
      } else {
        $rootScope.userIsLoggedIn = false;
      }
  });

});
