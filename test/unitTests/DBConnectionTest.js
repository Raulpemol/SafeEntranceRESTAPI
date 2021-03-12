const assert = require('assert');
const getDBConnection = require('../../modules/DBManager');

const URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD_test?retryWrites=true&w=majority";

before(function(){
    getDBConnection(URI);
});

describe('Database connection', function(){
    describe('BD Manager should return true if the connection was stablished', async function(){
        var dbConnectionResult = await getDBConnection();
        assert.strictEqual(dbConnectionResult, true);
    });
});