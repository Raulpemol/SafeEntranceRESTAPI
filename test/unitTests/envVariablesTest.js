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

    it('POST Should allow to set a value for a new environment variable', function testSlash(done){
        request(server)
            .post('/env/setVariable')
            .send({
                token: token,
                name: "idbp",
                value: 2
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not allow to set a non-numeric value for the variable', function testSlash(done){
        request(server)
            .post('/env/setVariable')
            .send({
                token: token,
                name: "idbp",
                value: "a"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('GET Should return the previously created variable', function testSlash(done){
        request(server)
            .get('/env/getVariable/idbp')
            .then(res => {
                expect(res.body).to.equal("2");
                done();
            });
    });
});