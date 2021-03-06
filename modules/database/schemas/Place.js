const mongoose = require('mongoose');
const place = new mongoose.Schema({
    name : {
        type : String
    },
    address : {
        type : String
    },
    capacity : {
        type : Number
    }
});

module.exports = Place = mongoose.model('place', place);