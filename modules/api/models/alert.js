const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    placeID : String,
    enterDateTime : Date,
    exitDateTime : Date
});

const alertSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    symptomsDate: Date,
    alertDate: Date,
    visits: [visitSchema]
});

module.exports = Alert = mongoose.model('alert', alertSchema);