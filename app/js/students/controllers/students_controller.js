module.exports = function(app) {
  app.controller('StudentsController', ['$scope', 'Resource', '$http', '$location', '$cookies', function($scope, Resource, $http, $location, $cookies) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.students = [];
    var studentResource = Resource('students');
    $scope.newStudent = {};

    $scope.getAll = function() {
      studentResource.getAll(function(err, data) {
        if (err) return console.log(err);
        $scope.students = data;
        $scope.updateCount();
      });
    };

    $scope.createStudent = function(student) {
      studentResource.create(student, function(err, data) {
        if (err) return console.log(err);
        $scope.newStudent = {};
        $scope.students.push(data);
        $scope.updateCount();
      });
    };

    $scope.updateStudent = function(student) {
      student.status = 'pending';
      studentResource.update(student, function(err) {
        delete student.status;
        student.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.removeStudent = function(student) {
      student.status = 'pending';
      studentResource.remove(student, function(err) {
        if (err) return console.log(err);
        $scope.students.splice($scope.students.indexOf(student), 1);
        $scope.updateCount();
      });
    };

    $scope.editStudent = function(student) {
      student.savedName = student.name;
      student.savedSubject = student.subject;
      student.savedGrade = student.grade;
      student.editing = true;
    };

    $scope.resetStudent = function(student) {
      student.name = student.savedName;
      student.subject = student.savedSubject;
      student.grade = student.savedGrade;
      student.savedName = student.savedSubject = student.savedGrade = null;
      student.editing = false;
    };

    $scope.updateCount = function() {
      $scope.count = $scope.students.length;
    };
  }]);
};
