module.exports = function(app) {
  app.directive('studentCount', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/student_count_template.html'
    };
  });
};
