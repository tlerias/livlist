'use strict';

app.factory('Card', function ($http, $routeParams){

  var cards;

  var Card = {
    getCards: function(){
      var promise = $http.get('/cards').success(function(data, status, headers, config) {
        console.log("get cards success: " + data);
        return data;
      });
      return promise;
    },
    create: function (title, description) {
      console.log("title & descript: "  + title + description);
      return $http.post('/add', {title: title, description: description} ).success(function(data, status) {
        console.log(data);
        console.log("sent to route");
  });
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
