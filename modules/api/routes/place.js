const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');

route.post('/addPlace', async (req, res) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address : req.body.address,
        capacity : req.body.capacity
    });
    place.save().then(result => {
            console.log(result);
            res.status(201).json(place._id);
    }).catch(err => {
        console.log(err);
        res.status(500).json("Error saving the new place");
    });
});

route.get('/getPlace/:id', async (req, res) => {
    try{
        const objectID = new mongoose.Types.ObjectId(req.params.id);
        Place.findById(objectID).then(result => {
            res.status(201).json(result);
        }).catch(err => {
            res.status(404).json("Place not found");
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;