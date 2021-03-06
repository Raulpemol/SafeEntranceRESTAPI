const express = require('express');
const mongoose = require('mongoose');
const Place = require('../database/schemas/Place');
const route = express.Router();

route.post('/', async (req, res) => {
    const {name, address, capacity} = req.body;
    let place = {
        name : name,
        address : address,
        capacity : capacity
    };
    let placeModel = new Place(place);
    await placeModel.save();
    res.json(placeModel);
});

module.exports = route;