var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, handleHash);
  function handleHash(err, hash) {
    if (err) return handleError(err, res);
    newUser.save(handleSave);
  }
  function handleSave(err, data) {
    if (err) return handleError(err, res);
    newUser.generateToken(handleToken);
  }
  function handleToken(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  }
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, handleUser);
  function handleUser(err, user) {
    if (err) return handleError(err, res);
    if (!user) {
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    user.compareHash(req.auth.password, handleCompareHash);
    function handleCompareHash(err, hashRes) {
      if (err) return handleError(err, res);
      if (!hashRes) {
        console.log('could not authenticate: ' + req.auth.username);
        return res.status(401).json({msg: 'could not authenticate'});
      }
      user.generateToken(handleSigninToken);
    }
  }
  function handleSigninToken(err, token) {
    if (err) return handleError(err, res);
    return res.json({token: token});
  }
});

usersRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});
