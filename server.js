var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/students_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'forrealchangemechangement';

app.use(express.static(__dirname + '/build'));
var studentsRouter = require(__dirname + '/routes/students_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', studentsRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server running on port ' + port);
});
