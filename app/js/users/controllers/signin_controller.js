module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$location', '$base64', '$cookies', function($scope, $http, $location, $base64, $cookies) {
    $scope.buttonText = 'Log In';
    $scope.user = {};
    $scope.changePlacesText = 'Create New User';

    $scope.changePlaces = function() {
      $location.path('/signup');
    };

    $scope.sendToServer = function(user) {
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
        }
      })
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
