const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');

route.post('/', async (req, res) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address : req.body.address,
        capacity : req.body.capacity
    });
    place.save().then(result => {
            console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json(place._id);
});

module.exports = route;