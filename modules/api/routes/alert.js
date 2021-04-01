const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Alert = require('../models/alert');
const visitSchema = require('../models/visit');
const Visit = mongoose.model('visit', visitSchema);

route.post('/addAlert', async (req, res) => {
    let visitArray = [];

    for(let i = 0; i < req.body.visits.length; i++){
        const visit = new Visit({
            placeID: req.body.visits[i].placeID,
            enterDateTime: req.body.visits[i].enterDateTime,
            exitDateTime: req.body.visits[i].exitDateTime
        });
        visitArray[i] = visit;
    }

    const alert = new Alert({
        _id: new mongoose.Types.ObjectId(),
        symptomsDate: req.body.symptomsDate,
        alertDate : req.body.alertDate,
        visits : visitArray
    });
    alert.save().then(result => {
            console.log(result);
            res.status(201).json(alert._id);
    }).catch(err => {
        console.log(err);
        res.status(500).json("Error registering the alert");
    });
});

module.exports = route;