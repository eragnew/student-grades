require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var studentsApp = angular.module('studentsApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(studentsApp);
require('./directives/directives')(studentsApp);
require('./students/students')(studentsApp);
require('./users/users')(studentsApp);
require('./logout')(studentsApp);
require('./router')(studentsApp);

