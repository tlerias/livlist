'use strict';

app.factory('Card', function ($http, $routeParams){

  var cards =
    [
      {
        "title": "1one",
        "content": "description for 1one"
      },
      {
        "title": "2two",
        "content": "description for 2two"
      },
      {
        "title": "3three",
        "content": "description for 3three"
      }
    ];


  // $http.get('/cards').success(function(data, status, headers, config) {
  //   console.log(data);
  //   cards = data;
  // });

  var Card = {
    all: cards,
    create: function (title, description) {
      console.log("title: " + title);
      console.log("description: " + description )
      return $http.post('/add', {title: title, description: description} ).success(function(data, status, headers, config) {
    console.log(data);
    cards = data;
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
