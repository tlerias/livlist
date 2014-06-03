'use strict';

app.factory('Card', function (){

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


  var Post = {
    all: posts,
    create: function (post) {
      return posts.$add(post);
    },
    find: function (postId) {
      return posts.$child(postId);
    },
    delete: function (postId) {
      return posts.$remove(postId);
    }
  };

  return Post;
});
