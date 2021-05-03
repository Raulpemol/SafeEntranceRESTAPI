var request = require('supertest');
var httpStatus = require('http-status');
const assert = require('assert');
const { expect } = require('chai');

describe('The admin login service', function(){
    var server;
    var token;

    const user = "administrador";
    const pass = "#g9ads765gAhGY4sHIDSfsFSt6564#";

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

    it('GET Should access the panel with the generated token', function testSlash(done){
        request(server)
            .get('/admin/panel')
            .set('token', token)
            .expect(httpStatus.OK, done);
    });

    it('GET Should not access the panel with an invalid token', function testSlash(done){
        request(server)
            .get('/admin/panel')
            .set('token', "invalidToken")
            .expect(httpStatus.FORBIDDEN, done);
    });

    it('GET Should not access the panel with an empty token', function testSlash(done){
        request(server)
            .get('/admin/panel')
            .set('token', "")
            .expect(httpStatus.FORBIDDEN, done);
    });

    it('POST Should not login with wrong username', function testSlash(done){
        request(server)
            .post('/admin')
            .send({
                username: "admin",
                password: pass
            })
            .expect(httpStatus.FORBIDDEN, done);
    });

    it('POST Should not login with wrong password', function testSlash(done){
        request(server)
            .post('/admin')
            .send({
                username: user,
                password: "wrongpassword"
            })
            .expect(httpStatus.FORBIDDEN, done);
    });
});