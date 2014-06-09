'use strict';


angular.module('livListApp').controller('navCtrl', function($scope, $cookieStore){
  $scope.showForm = {form: false};
  $scope.currentUser = $cookieStore.get('user');

  $scope.addCardForm = function() {
    $scope.showForm.form = !$scope.showForm.form;
  };

});
