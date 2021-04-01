const assert = require('assert');
const getDBConnection = require('../../modules/DBManager');
const mongoose = require('mongoose');
const Alert = require('../../modules/api/models/alert');
const visitSchema = require('../../modules/api/models/visit');
const Visit = mongoose.model('visit', visitSchema);

const URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD_test?retryWrites=true&w=majority";

before(function(){
    getDBConnection(URI);
});

describe('Initialize collection alerts', function(){
    it('should empty the collection', async function(){
        await Alert.deleteMany({}, async function(err){
            if(err){
                assert.fail();
            }
            else{
                await Alert.find({}, function(err2, alerts){
                    if(err2){
                        assert.fail();
                    }
                    else{
                        assert.strictEqual(alerts.length, 0);
                    }
                });
            }
        })
    });
});

describe('Inserting an alert with no visits', function(){
    it('should add an alert to the collection', async function(){
        var date1 = Date.now();
        var date2 = Date.now();
        const alert = new Alert({
            _id: new mongoose.Types.ObjectId(),
            symptomsDate: date1,
            alertDate : date2,
            visits : []
        });

        await alert.save().then(result => {
        }).catch(err => {
            console.log(err);
            assert.fail();
        });
        
        describe('The collection must have', function(){
            it('only one alert', async function(){
                Alert.find({}, function(err2, alerts){
                    if(err2){
                        assert.fail();
                    }
                    else{
                        assert.strictEqual(alerts.length, 1);
                    }
                });
            });
        });
    });
});

describe('Inserting an alert visits', function(){
    it('should add an alert to the collection', async function(){
        var date1 = Date.now();
        var date2 = Date.now();
        const visit1 = new Visit({
            _id : mongoose.Schema.Types.ObjectId,
            placeID : "1a",
            enterDateTime : date1,
            exitDateTime : date1
        });
        const visit2 = new Visit({
            _id : mongoose.Schema.Types.ObjectId,
            placeID : "2a",
            enterDateTime : date2,
            exitDateTime : date2
        });
        const alert = new Alert({
            _id: new mongoose.Types.ObjectId(),
            symptomsDate: date1,
            alertDate : date2,
            visits : [visit1, visit2]
        });

        await alert.save().then(result => {
        }).catch(err => {
            console.log(err);
            assert.fail();
        });
        
        describe('The collection must have', function(){
            it('two alerts', async function(){
                Alert.find({}, function(err2, alerts){
                    if(err2){
                        assert.fail();
                    }
                    else{
                        assert.strictEqual(alerts.length, 2);
                    }
                });
            });
        });
    });
});