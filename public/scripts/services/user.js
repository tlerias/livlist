'use strict';

app.service('User', function (){

  var userIsAuthenticated = false;

  this.setUserAuthenticated = function(value){
      userIsAuthenticated = value;
  };

  this.getUserAuthenticated = function(){
      return userIsAuthenticated;
  };

});
