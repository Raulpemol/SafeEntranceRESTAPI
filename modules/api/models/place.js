const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    capacity: Number
});

module.exports = Place = mongoose.model('place', placeSchema);