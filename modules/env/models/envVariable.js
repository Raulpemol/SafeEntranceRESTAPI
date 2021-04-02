const mongoose = require('mongoose');

const envVarSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    value: String
});

module.exports = EnvVariable = mongoose.model('envVariable', envVarSchema);