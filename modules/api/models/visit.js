const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    placeID : String,
    enterDateTime : Date,
    exitDateTime : Date
});

module.exports = visitSchema;