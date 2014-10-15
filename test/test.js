var assert = require('assert')
var should = require('should')
var request = require('supertest');
var app = require('../app');

describe('POST /api/employee-groups/', function(){
  it("should successfully upload csv's", function(done){
    request(app)
      .post('/api/employee-groups')
      .attach('employees', __dirname+'/employees_small.csv')
      .attach('salaries', __dirname+'/salaries_small.csv')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /api/employee-groups/1/employees', function(){
  it('should have correct results', function(done){
    request(app)
      .get('/api/employee-groups/1/employees')
      .expect('Content-Type', /json/)
      .expect(function(res){
        res.body.should.have.property('results');
        res.body.results.should.have.property('data');
        res.body.results.data.length.should.equal(1000);
      })
      .expect(200, done);
  });
});
describe('GET /api/employee-groups/1/employees/10061/salaries', function(){
  it('should have correct results', function(done){
    request(app)
      .get('/api/employee-groups/1/employees/10061/salaries')
      .expect('Content-Type', /json/)
      .expect(function(res){
        res.body.should.have.property('results');
        res.body.results.should.have.property('data');
        res.body.results.data.length.should.equal(13);
      })
      .expect(200, done);
  });
})
