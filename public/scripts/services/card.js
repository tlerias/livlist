'use strict';

app.factory('Card', function ($http, $routeParams){

  var cards;

  var Card = {
    getCards: function(userId){
      var getCardPromise = $http.get('/cards/' + userId).success(function(data, status, headers, config) {
        return data;
      });
      return getCardPromise;
    },
    create: function (title, description, tags, owner) {
      var createPromise = $http.post('/add', {title: title, description: description, tags: tags, owners: owner} ).success(function(data, status) {
        return(data);
  });
      return createPromise;
    },
     find: function (postId) {
       var findCardPromise = $http.get('/card/'+postId+'/edit').success(function(data, status, headers, config) {
        return data;
      });
      return findCardPromise;
     },
     update: function (title, description, tags, postId) {
       var editCardPromise = $http.post('/card/'+postId+'/edit_submit', {title: title, description: description, tags: tags}).success(function(data, status, headers, config) {
        return data;
      });
      return editCardPromise;
     },
    delete: function (postId) {
      var deleteCardPromise = $http.post('/card/'+postId+'/delete').success(function(data, status, headers, config) {
        return data;
      });
      return deleteCardPromise;
    },

    logout: function(){
      var logoutPromise = $http.get('/logout').success(function(headers) {
        return headers;
      });
      return logoutPromise;
    },

    updateDone: function(postId, userId){
     var doneCardPromise = $http.get('/card/'+postId+userId+'/done').success(function(headers){
      return headers;
     });
     return doneCardPromise;
    }
  };

  return Card;
});
