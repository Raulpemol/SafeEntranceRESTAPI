const assert = require('assert');
const getDBConnection = require('../../modules/DBManager');

before(function(){
    getDBConnection();
});

describe('Database connection', function(){
    describe('BD Manager should return true if the connection was stablished', async function(){
        var dbConnectionResult = await getDBConnection();
        assert.strictEqual(dbConnectionResult, true);
    });
});