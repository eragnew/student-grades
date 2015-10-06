require('angular/angular');

var studentsApp = angular.module('studentsApp', []);

require('./services/services')(studentsApp);
require('./directives/directives')(studentsApp);
require('./students/students')(studentsApp);

