const mongoose = require('mongoose');

const visitSchema = require('./visit');

const alertSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    symptomsDate: Date,
    alertDate: Date,
    visits: [visitSchema]
});

module.exports = Alert = mongoose.model('alert', alertSchema);