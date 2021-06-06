var request = require('supertest');
var httpStatus = require('http-status');
const assert = require('assert');
const Alert = require('../../modules/api/models/alert');
const { expect } = require('chai');
const Place = require('../../modules/api/models/place');

describe('Places API tests', function(){
    var server;

    beforeEach(function () {
        server = require('../../index');
    });

    afterEach(function () {
        server.close();
    });

    it('BEFORE Initialize DB collection', async function testSlash(done){
        Place.deleteMany({}, function(err){
            if(err){
                assert.fail();
            }
            else{
                Place.find({}, function(err2, places){
                    if(err2){
                        assert.fail();
                    }
                    else{
                        assert.strictEqual(places.length, 0);
                    }
                });
            }
        });
        
        done();
    });

    it('POST Should add a place to the collection', function testSlash(done){
        request(server)
            .post('/api/places/addPlace')
            .send({
                name: "test name",
                address : "test address",
                capacity : "1"
            })
            .expect(httpStatus.CREATED, done);
    });

    it('POST Should not add a place with a non-number capacity', function testSlash(done){
        request(server)
            .post('/api/places/addPlace')
            .send({
                name: "test name",
                address : "test address",
                capacity : "a"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('POST Should not add a place with missing fields', function testSlash(done){
        request(server)
            .post('/api/places/addPlace')
            .send({
                address : "test address",
                capacity : "1"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('POST Should not add a place in the same address as the previous', function testSlash(done){
        request(server)
            .post('/api/places/addPlace')
            .send({
                name: "test name 2",
                address : "test address",
                capacity : "1"
            })
            .expect(httpStatus.BAD_REQUEST, done);
    });

    it('POST Should add a place in another address', function testSlash(done){
        request(server)
            .post('/api/places/addPlace')
            .send({
                name: "test name",
                address : "test address 2",
                capacity : "1"
            })
            .expect(httpStatus.CREATED, done);
    });

    it('GET Should return an error if we dont provide an id to search', function testSlash(done){
        request(server)
            .get('/api/places/getPlace')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if the id does not match the required format', function testSlash(done){
        request(server)
            .get('/api/places/getPlace/00testiddoesnotexist11')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if the id does not exist', function testSlash(done){
        request(server)
            .get('/api/places/getPlace/testiddoesnotexistindb00')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if we dont provide an id to search', function testSlash(done){
        request(server)
            .get('/api/places/getPlaceName')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if the id does not match the required format', function testSlash(done){
        request(server)
            .get('/api/places/getPlaceName/00testiddoesnotexist11')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if the id does not exist', function testSlash(done){
        request(server)
            .get('/api/places/getPlaceName/testiddoesnotexistindb00')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return an error if we dont provide a name', function testSlash(done){
        request(server)
            .get('/api/places/searchPlaceByName')
            .expect(httpStatus.NOT_FOUND, done);
    });

    it('GET Should return a list with the places matching the name provided', function testSlash(done){
        request(server)
            .get('/api/places/searchPlaceByName/test%20name')
            .then(res => {
                expect(res.body[0].name).to.equal("test name");
                expect(res.body[0].address).to.equal("test address");
                expect(res.body[0].capacity).to.equal(1);
                expect(res.body[1].name).to.equal("test name");
                expect(res.body[1].address).to.equal("test address 2");
                expect(res.body[1].capacity).to.equal(1);
                done();
            });
    });
});
