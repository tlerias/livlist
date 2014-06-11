'use strict';


angular.module('livListApp').controller('navCtrl', function($scope, $rootScope, $cookieStore, $location){
  $scope.showForm = {form: false};
  $scope.currentUser = $cookieStore.get('user');
  $scope.urlPath = $location.path();


// $scope.$on('$routeUpdate', function(){
//   console.log("location path for navbar: "+ $scope.urlPath);
// });


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

  // $scope.$on('$routeChangeSuccess', function (next, current) {
  //   console.log('route change success: '+ $scope.urlPath)
  // });

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
