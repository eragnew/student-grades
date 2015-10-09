module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
    $scope.buttonText = 'Create a New User';
    $scope.confirmPassword = true;
    $scope.user = {};
    $scope.changePlacesText = 'Sign in as Existing User';

    $scope.passwordMatch = function(user) {
      return user.password === user.confirmation;
    };

    $scope.disableButton = function(user) {
      return ($scope.userForm.$invalid && !scope.passwordMatch(user));
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };

    $scope.sendToServer = function(user) {
      $http.post('/api/signup', user)
        .then(function(res) {
          $cookies.put('eat', res.data.token);
          $scope.getUsername();
          $location.path('/students');
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
