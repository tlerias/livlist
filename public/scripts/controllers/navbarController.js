'use strict';


angular.module('livListApp').controller('navCtrl', function($scope){
  $scope.showForm = {form: false};

  $scope.addCardForm = function() {
    $scope.showForm.form = !$scope.showForm.form;
  };

});
