module.exports = function(app) {
  app.config(['$routeProvider', function($route) {
    $route
      .when('/students', {
        templateUrl: '/templates/students/views/students_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
