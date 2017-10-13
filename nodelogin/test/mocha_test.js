/**
 * New node file
 */
var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {

    it('should return the login page if the url is correct', function(done) {
        http.get('http://localhost:3001/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

     it('should not return the home page if the url is wrong', function(done) {
         http.get('http://localhost:3001/home', function(res) {
             assert.equal(404, res.statusCode);
             done();
         })
     });
    it('should login', function(done) {
        request.post('/users/doLogin', {
           // form : {
                Email: 'hknitw@gmail.com',
                password : '1234567q'
           // }
        }, function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });
});