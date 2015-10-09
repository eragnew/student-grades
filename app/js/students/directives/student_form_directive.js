module.exports = function(app) {
  app.directive('studentForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/students/directives/student_form_template.html',
      scope: {
        buttonText: '@',
        student: '=',
        save: '&'
      }
    };
  });
};
