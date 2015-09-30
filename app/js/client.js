require('angular/angular');

var studentsApp = angular.module('studentsApp', []);
require('./students/students')(studentsApp);

