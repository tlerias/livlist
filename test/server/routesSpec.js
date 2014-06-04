'use strict';

var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    app = require('../../app');

describe('Routing', function() {

  describe('GET /cards', function() {
    it('should return 200', function(done) {
      request(app)
      .get('/cards')
      .expect(200, done);
    });
  });

  describe('POST /add', function() {
    it('should return 200', function(done) {
      request(app)
      .post('/add')
      .expect(200, done);
    });
  });

});
