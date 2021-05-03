var request = require('supertest');
var httpStatus = require('http-status');
const assert = require('assert');
const { expect } = require('chai');
const EnvVariable = require('../../modules/env/models/envVariable');

describe('The environment variables API', function(){
    var server;
    var token;

    const user = "test_user";
    const pass = "test_password";

    before(function () {
        server = require('../../index');
    });

    afterEach(function () {
        server.close();
    });

    it('POST Should log in with admin credentials', function testSlash(done){
        request(server)
            .post('/admin')
            .send({
                username: user,
                password: pass
            })
            .then(function (res) {
                token = res.body.token;
                done();
            });
    });

    it('POST Should allow to set a value for the infectious days before a pcr', function testSlash(done){
        request(server)
            .post('/env/setidbp')
            .send({
                token: token,
                value: 2
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not allow to set a non-numeric value for the infectious days before a pcr', function testSlash(done){
        request(server)
            .post('/env/setidbp')
            .send({
                token: token,
                value: "a"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('GET Should return the infectious days before a pcr', function testSlash(done){
        request(server)
            .get('/env/idbp')
            .then(res => {
                expect(res.body).to.equal("2");
                done();
            });
    });

    it('POST Should allow to set a value for the days after infective period', function testSlash(done){
        request(server)
            .post('/env/setdapi')
            .send({
                token: token,
                value: 7
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not allow to set a non-numeric value for the days after infective period', function testSlash(done){
        request(server)
            .post('/env/setdapi')
            .send({
                token: token,
                value: "a"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('GET Should return the days after infective period', function testSlash(done){
        request(server)
            .get('/env/dapi')
            .then(res => {
                expect(res.body).to.equal("7");
                done();
            });
    });

    it('POST Should allow to set a value for the minutes to be a direct contact', function testSlash(done){
        request(server)
            .post('/env/setmfdc')
            .send({
                token: token,
                value: 15
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not allow to set a non-numeric value for the minutes to be a direct contact', function testSlash(done){
        request(server)
            .post('/env/setmfdc')
            .send({
                token: token,
                value: "a"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('GET Should return the minutes to be a direct contact', function testSlash(done){
        request(server)
            .get('/env/mfdc')
            .then(res => {
                expect(res.body).to.equal("15");
                done();
            });
    });
});