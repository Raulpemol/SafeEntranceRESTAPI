const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Alert = require('../models/alert');

route.post('/addAlert', async (req, res) => {
    const alert = new Alert({
        _id: new mongoose.Types.ObjectId(),
        symptomsDate: req.body.symptomsDate,
        alertDate : req.body.alertDate,
        visits : req.body.visits
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