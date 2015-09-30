var Student = require(__dirname + '/../models/student');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var studentsRoute = module.exports = exports = express.Router();

studentsRoute.get('/students', function(req, res) {
  Student.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

studentsRoute.post('/students', jsonParser, function(req, res) {
  var newStudent = new Student(req.body);
  newStudent.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

studentsRoute.put('/students/:id', jsonParser, function(req, res) {
  var newStudentBody = req.body;
  delete newStudentBody._id;
  Student.update({_id: req.params.id}, newStudentBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

studentsRoute.delete('/students/:id', function(req, res) {
  Student.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

studentsRoute.get('/subjects', function(req, res) {
  Student.find().distinct('subject', function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

