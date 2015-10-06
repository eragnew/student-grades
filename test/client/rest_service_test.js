require('../../app/js/client');

describe('rest service', function() {
  beforeEach(angular.mock.module('studentsApp'));

  var RestService;
  var $httpBackend;
  var studentsResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    RestService = Resource;
    $httpBackend = _$httpBackend_;
    studentsResource = RestService('students');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/students').respond(200, [{
      _id: 123,
      name: 'Joe Sixpack',
      subject: 'Math',
      grade: 4
    }]);
    studentsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should make a post request', function() {
    var mockStudent = {
      name: 'Joe Sixpack',
      subject: 'Math',
      grade: 4
    };
    $httpBackend.expectPOST('/api/students', mockStudent).respond(200, {
      _id: 123,
      name: 'Joe Sixpack',
      subject: 'Math',
      grade: 4
    });
    studentsResource.create(mockStudent, function(err, data) {
      expect(err).toBe(null);
      expect(data._id).toBe(123);
      expect(data.name).toBe('Joe Sixpack');
      expect(data.subject).toBe('Math');
      expect(data.grade).toBe(4);
    });
    $httpBackend.flush();
  });

  it('should make a put request', function() {
    var mockStudent = {
      _id: 123,
      name: 'Jane Eightpack',
      subject: 'Art',
      grade: 2
    };
    $httpBackend.expectPUT('/api/students/123', mockStudent).respond(200);
    studentsResource.update(mockStudent, function(err) {
      expect(err).toBe(null);
    });
    $httpBackend.flush();
  });

  it('should make a delete request', function() {
    var mockStudent = {
      _id: 123,
      name: 'Frank',
      subject: 'English',
      grade: 2.5
    };
    $httpBackend.expectDELETE('/api/students/123').respond(200);
    studentsResource.remove(mockStudent, function(err) {
      expect(err).toBe(null);
    });
    $httpBackend.flush();
  });
});
