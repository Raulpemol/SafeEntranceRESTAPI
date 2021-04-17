const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');

route.post('/addPlace', async (req, res) => {
    Place.findOne({address: req.body.address}, function(err, placeByAddress){
        if(err){
            console.log(err);
            res.status(500).json("Error accessing the database");
        }
        else{
            if(placeByAddress != null){
                res.status(400).json("Ya se ha registrado un local en la dirección " + req.body.address);
            }
            else{
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
            }
        }
    });
});

route.get('/getPlace/:id', async (req, res) => {
    try{
        const objectID = new mongoose.Types.ObjectId(req.params.id);
        Place.findById(objectID).then(result => {
            if(result == "null" || result == null){
                res.status(404).json("Place not found");
            }
            else{
                res.status(200).json(result);
            }
        }).catch(err => {
            res.status(404).json("Place not found");
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.get('/getPlaceName/:id', async (req, res) => {
    try{
        const objectID = new mongoose.Types.ObjectId(req.params.id);
        Place.findById(objectID).then(result => {
            if(result == "null" || result == null){
                res.status(404).json("Place not found");
            }
            else{
                res.status(200).json(result.name);
            }
        }).catch(err => {
            res.status(404).json("Place not found");
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.get('/searchPlaceByName/:name', async (req, res) => {
    try{
        const name = req.params.name;
        Place.find({name : name}, function(err, places){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(places);
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;