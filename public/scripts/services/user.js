'use strict';

app.service('User', function ($cookieStore){
var userIsAuthenticated;

  if($cookieStore.get('user')){
    userIsAuthenticated = true;
  } else{
    userIsAuthenticated = false;
  }




  this.setUserAuthenticated = function(value){
      userIsAuthenticated = value;
  };

  this.getUserAuthenticated = function(){
      return userIsAuthenticated;
  };

});
