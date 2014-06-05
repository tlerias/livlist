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
    }
    // find: function (postId) {
    //   return posts.$child(postId);
    // },
    // delete: function (postId) {
    //   return posts.$remove(postId);
    // }
  };

  return Card;
});
