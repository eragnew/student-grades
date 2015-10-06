module.exports = function(app) {
  app.directive('studentCount', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<p>Student Count: {{count}}</p>'
    };
  });
};
