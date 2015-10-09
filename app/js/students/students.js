module.exports = function(app) {
  require('./controllers/students_controller')(app);
  require('./directives/student_form_directive')(app);
};
