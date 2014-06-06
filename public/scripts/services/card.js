'use strict';

app.factory('Card', function ($http, $routeParams){

  var cards;

  var Card = {
    getCards: function(){
      var getCardPromise = $http.get('/cards').success(function(data, status, headers, config) {
        console.log("get cards success: " + data);
        return data;
      });
      return getCardPromise;
    },
    create: function (title, description, tags) {
      console.log("just entered the create function in factory");
      var createPromise = $http.post('/add', {title: title, description: description, tags: tags} ).success(function(data, status) {
        return(data);
  });
      return createPromise;
    },
     find: function (postId) {
       var findCardPromise = $http.get('/card/'+postId+'/edit').success(function(data, status, headers, config) {
        console.log("get cards success: " + data);
        return data;
      });
      return findCardPromise;
     },
     update: function (title, description, tags, postId) {
       var editCardPromise = $http.post('/card/'+postId+'/edit_submit', {title: title, description: description, tags: tags}).success(function(data, status, headers, config) {
        console.log("get cards success: " + data);
        return data;
      });
      return editCardPromise;
     },
    delete: function (postId) {
      var deleteCardPromise = $http.post('/card/'+postId+'/delete').success(function(data, status, headers, config) {
        return data;
      });
      return deleteCardPromise;
    }
  };

  return Card;
});
