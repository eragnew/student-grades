var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/students_test';
require(process.env.PWD + '/server');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Student = require(process.env.PWD + '/models/student');
var User = require(process.env.PWD + '/models/user');

var token = '';

describe('the student resource', function() {
  before(function(done) {
    chai.request(url)
      .post('/signup')
      .send({username: 'test', password: 'foobar123'})
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get student documents', function(done) {
    chai.request(url)
      .get('/students')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a student document', function(done) {
    chai.request(url)
      .post('/students')
      .send({
        name: 'Joe Sixpack',
        subject: 'Math',
        grade: 3.5,
        token: token
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Joe Sixpack');
        expect(res.body.subject).to.eql('Math');
        expect(res.body.grade).to.eql(3.5);
        done();
      });
  });

  it('should enforce a grade range between 0 and 4', function(done) {
    chai.request(url)
      .post('/students')
      .send({
        name: 'Jane Eightpack',
        subject: 'English',
        grade: 5,
        token: token
      })
      .end(function(err, res) {
        expect(res).to.have.status(500);
        expect(res.body.msg).to.eql('internal server error');
        done();
      });
  });

  describe('routes that need a student document in the database', function() {
    beforeEach(function(done) {
      var testStudent = new Student({
        name: 'Joe',
        subject: 'History',
        grade: 2.33,
        username: 'test'
      });
      testStudent.save(function(err, data) {
        if (err) throw err;
        this.testStudent = data;
        done();
      }.bind(this));
    });

    it('should be able to update a student document', function(done) {
      chai.request(url)
        .put('/students/' + this.testStudent._id)
        .send({
          name: 'Joe Sixpack',
          subject: 'Art',
          grade: 3.33,
          token: token
        })
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a student document', function(done) {
      chai.request(url)
        .delete('/students/' + this.testStudent._id)
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });

  describe('the subjects resource', function() {
    before(function(done) {
      Student.remove({}, function(err) {
        if (err) return console.log(err);
      });
      chai.request(url)
        .post('/students')
        .send({
          name: 'Jane Eightpack',
          subject: 'English',
          grade: 3,
          token: token
        })
        .end();
      chai.request(url)
        .post('/students')
        .send({
          name: 'Joe Sixpack',
          subject: 'History',
          grade: 4,
          token: token
        })
        .end();
      chai.request(url)
        .post('/students')
        .send({
          name: 'Frank Ninepack',
          subject: 'Math',
          grade: 2,
          token: token
        })
        .end(function(err, res) {
          done();
        });
    });

    it('should return a list of distinct subjects', function(done) {
      chai.request(url)
        .get('/subjects')
        .end(function(err, res) {
          debugger;
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body).to.have.members(['English', 'History', 'Math']);
          done();
        });
    });
  });
});
