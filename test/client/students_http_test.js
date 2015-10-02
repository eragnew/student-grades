require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('students controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('studentsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('StudentsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.students)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('StudentsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll() is called', function() {
      $httpBackend.expectGET('/api/students').respond(200, [{
        name: 'Joe Sixpack',
        subject: 'Math',
        grade: 4
      }]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.students[0].name).toBe('Joe Sixpack');
      expect($scope.students[0].subject).toBe('Math');
      expect($scope.students[0].grade).toBe(4);
    });

    it('should be able to create a student record', function() {
      $httpBackend.expectPOST('/api/students', {
        name: 'Jane Eightpack',
        subject: 'Art',
        grade: 2
      }).respond(200, {_id: 1, name: 'Student X', subject: 'History', grade: 3});
      $scope.newStudent = {name: 'Frank', subject: 'English', grade: 1};
      $scope.createStudent({
        name: 'Jane Eightpack',
        subject: 'Art',
        grade: 2
      });
      $httpBackend.flush();
      expect($scope.students[0].name).toBe('Student X');
      expect($scope.students[0].subject).toBe('History');
      expect($scope.students[0].grade).toBe(3);
      expect($scope.newStudent).toBe(null);
    });

    it('should be able to update a student record', function() {
      var student = {_id: 123, name: 'Lisa', subject: 'Art', grade: 3.5, editing: true};
      $httpBackend.expectPUT('/api/students/123', {
        _id: 123,
        name: 'Lisa',
        subject: 'Art',
        grade: 3.5,
        editing: true,
        status: 'pending'
      }).respond(200, {msg: 'success'});
      $scope.updateStudent(student);
      $httpBackend.flush();
      expect(student.editing).toBe(false);
      expect(student.status).toBe(undefined);
    });

    it('should be able to delete a student record', function() {
      $scope.students[0] = {_id: 123, name: 'Lisa', subject: 'Art', grade: 3.5};
      $httpBackend.expectDELETE('/api/students/123').respond(200, {msg: 'success'});
      $scope.removeStudent($scope.students[0]);
      $httpBackend.flush();
      expect($scope.students.length).toBe(0);
    });

    it('should save student info when editing', function() {
      var student = {name: 'Frank', subject: 'Photography', grade: 3};
      $scope.editStudent(student);
      expect(student.savedName).toBe('Frank');
      expect(student.savedSubject).toBe('Photography');
      expect(student.savedGrade).toBe(3);
      expect(student.editing).toBe(true);
    });

    it('should reset student info on cancel', function() {
      var student = {savedName: 'Frank', savedSubject: 'Photography', savedGrade: 3, editing: true};
      $scope.resetStudent(student);
      expect(student.name).toBe('Frank');
      expect(student.subject).toBe('Photography');
      expect(student.grade).toBe(3);
      expect(student.editing).toBe(false);
    });
  });
});
