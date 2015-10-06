var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleError = function(callback) {
  return function(err) {
    callback(err);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.create = function(resource, callback) {
      $http.post('/api/' + this.resourceName, resource)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.prototype.getAll = function(callback) {
      $http.get('/api/' + this.resourceName)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.prototype.update = function(resource, callback) {
      $http.put('/api/' + this.resourceName + '/' + resource._id, resource)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.prototype.remove = function(resource, callback) {
      $http.delete('/api/' + this.resourceName + '/' + resource._id)
        .then(handleSuccess(callback), handleError(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
