const assert = require('assert');
const getDBConnection = require('../../modules/DBManager');
const mongoose = require('mongoose');
const Place = require('../../modules/api/models/place');

const URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD_test?retryWrites=true&w=majority";

before(function(){
    getDBConnection(URI);
});

describe('Initialize collection places', function(){
    it('should empty the collection', async function(){
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
        })
    });
});

describe('Inserting a correct place', function(){
    it('should add a place to the collection', async function(){
        const place = new Place({
            _id: new mongoose.Types.ObjectId(),
            name: "test name",
            address : "test address",
            capacity : "1"
        });

        await place.save().then(result => {
            assert.strictEqual(result.name, "test name");
            assert.strictEqual(result.address, "test address");
            assert.strictEqual(result.capacity, 1);
        }).catch(err => {
            console.log(err);
            assert.fail();
        });
    describe('The collection must have', function(){
        it('only one place', function(){
            const db = mongoose.connection;
            db.collection("places", function(err, collection){
                assert.strictEqual(collection.count(), 1);
            });
        });
    });
    });
});