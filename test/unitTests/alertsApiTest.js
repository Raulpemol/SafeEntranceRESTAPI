var request = require('supertest');
var httpStatus = require('http-status');
const assert = require('assert');
const Alert = require('../../modules/api/models/alert');
const { expect } = require('chai');

describe('Alerts API tests', function () {
    var server;

    beforeEach(function () {
        server = require('../../index');
    });

    afterEach(function () {
        server.close();
    });

    it('BEFORE Initialize Alerts DB collection', function testSlash(done){
        Alert.deleteMany({}, function(err){
            if(err){
                assert.fail();
            }
            else{
                Alert.find({}, function(err2, alerts){
                    if(err2){
                        assert.fail();
                    }
                    else{
                        assert.strictEqual(alerts.length, 0);
                    }
                });
            }
        });
        done();
    });

    it('POST Should not obtain any possible contact', function testSlash(done) {
        request(server)
            .post('/api/alerts/getAffectingAlerts')
            .send({
                places: ["6071b312fae6a100338e9246"], 
                fromDate: "2021-01-03T13:25:00.000",
                exclude: []
            })
            .then(res => {
                expect(res.body).to.be.empty;
                done();
            });
    });

    it('POST Should create a validated alert with some visits', function testSlash(done) {
        request(server)
            .post('/api/alerts/addAlert')
            .send({
                alertDate: "01/04/2021 14:25:00",
                symptomsDate: "01/04/2021 14:26:59",
                state: "VALIDADA",
                visits: [
                    {placeID: "6071b312f0338e9246", enterDateTime: "01/04/2021 14:00:00", exitDateTime: "01/04/2021 14:20:00"},
                    {placeID: "6071b312fae6a100338e9246", enterDateTime: "01/04/2021 14:15:00", exitDateTime: "01/04/2021 14:16:00"},
                    {placeID: "6071b312fae6a1006", enterDateTime: "01/04/2021 14:17:00", exitDateTime: "01/04/2021 14:20:00"}]
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should create a non validated alert with some visits', function testSlash(done) {
        request(server)
            .post('/api/alerts/addAlert')
            .send({
                alertDate: "01/04/2021 14:25:00",
                symptomsDate: "01/04/2021 14:26:59",
                state: "CREADA",
                visits: [
                    {placeID: "6071b312f0338e9246", enterDateTime: "01/04/2021 14:00:00", exitDateTime: "01/04/2021 14:20:00"},
                    {placeID: "6071b312fae6a100338e9247", enterDateTime: "01/04/2021 14:15:00", exitDateTime: "01/04/2021 14:16:00"},
                    {placeID: "6071b312fae6a1006", enterDateTime: "01/04/2021 14:17:00", exitDateTime: "01/04/2021 14:20:00"}]
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not create an alert missing any field', function testSlash(done) {
        request(server)
            .post('/api/alerts/addAlert')
            .send({
                alertDate: "01/04/2021 14:25:00",
                symptomsDate: "01/04/2021 14:26:59",
                visits: [
                    {placeID: "6071b312f0338e9246", enterDateTime: "01/04/2021 14:00:00", exitDateTime: "01/04/2021 14:20:00"},
                    {placeID: "6071b312fae6a100338e9246", enterDateTime: "01/04/2021 14:15:00", exitDateTime: "01/04/2021 14:16:00"},
                    {placeID: "6071b312fae6a1006", enterDateTime: "01/04/2021 14:17:00", exitDateTime: "01/04/2021 14:20:00"}]
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('POST Should not create an alert whose visits miss fields', function testSlash(done) {
        request(server)
            .post('/api/alerts/addAlert')
            .send({
                alertDate: "01/04/2021 14:25:00",
                symptomsDate: "01/04/2021 14:26:59",
                state: "CREADA",
                visits: [
                    {placeID: "6071b312f0338e9246", exitDateTime: "01/04/2021 14:20:00"},
                    {enterDateTime: "01/04/2021 14:15:00", exitDateTime: "01/04/2021 14:16:00"},
                    {placeID: "6071b312fae6a1006", enterDateTime: "01/04/2021 14:17:00"}]
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('POST Should create a new alert with an empty list of visits', function testSlash(done) {
        request(server)
            .post('/api/alerts/addAlert')
            .send({
                alertDate: "01/04/2021 14:25:00",
                symptomsDate: "01/04/2021 14:26:59",
                state: "CREADA",
                visits: []
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should obtain only the first alert as a possible contact', function testSlash(done) {
        request(server)
            .post('/api/alerts/getAffectingAlerts')
            .send({
                places: ["6071b312fae6a100338e9246"], 
                fromDate: "2021-01-03T13:25:00.000",
                exclude: []
            })
            .then(res => {
                expect(res.body[0].placeID).to.equal("6071b312fae6a100338e9246");
                try{
                    expect(res.body[1].placeID).to.equal("6071b312fae6a100338e9247");
                    assert.fail();
                }
                catch{
                    done();
                }
            });
    });

    it('GET Should obtain the second and third alerts as not validated ones', function testSlash(done) {
        request(server)
            .get('/api/alerts/getNotValidated')
            .then(res => {
                expect(res.body[0].visits[1].placeID).to.equal("6071b312fae6a100338e9247");
                expect(res.body[1].visits).to.be.empty;
                done();
            });
    });
});