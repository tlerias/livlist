angular.module('livListApp').directive('checkUser', ['$rootScope', '$location', 'User', function ($root, $location, User) {
  return {
    link: function (scope, elem, attrs, ctrl) {
      $root.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        console.log(currRoute);
        if (!prevRoute.access.needAuthenticate && !User.isLogged) {
          console.log("new directive: "+ (!prevRoute.access.needAuthenticate && !User.isLogged));
          $location.url('/login');
        }
      });
    }
  }
}]);
