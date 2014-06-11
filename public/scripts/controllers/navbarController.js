'use strict';


angular.module('livListApp').controller('navCtrl', function($scope, $rootScope, $cookieStore){
  $scope.showForm = {form: false};
  $scope.currentUser = $cookieStore.get('user');
  console.log("in nav controller current user: " + $scope.currentUser)

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
        console.log('user is logged in');
        console.log('current user: ' + $cookieStore.get('user'));
      } else {
        $rootScope.userIsLoggedIn = false;
        console.log('user is not logged in');
        console.log('current user: ' + $cookieStore.get('user'));
      }
    });
});
