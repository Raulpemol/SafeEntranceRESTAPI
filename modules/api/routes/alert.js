const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Alert = require('../models/alert');
const visitSchema = require('../models/visit');
const Visit = mongoose.model('visit', visitSchema);

const VALID_ALERT_STATE = "VALIDADA";
const CREATED_ALERT_STATE = "CREADA";

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
        validationDate: null,
        state: req.body.state,
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

route.post('/getAffectingAlerts', async (req, res) => {
    try{
        let result = new Array();
        let fromDate = req.body.fromDate;
        let places = req.body.places;
        let excludeIds = req.body.exclude;
        if(places.length > 0){
            Alert.find({state: VALID_ALERT_STATE, _id: {"$nin": excludeIds}, alertDate: {"$gte": fromDate}, "visits.placeID": { "$in": places }}, function(err, alerts){
                if(err){
                    console.log(err);
                    res.status(500).json("Error accessing the database");
                }
                else{
                    console.log(alerts[0]);
                    for(let j = 0; j < alerts.length; j++){
                        for(let k = 0; k < alerts[j].visits.length; k++){
                            if(places.includes(alerts[j].visits[k].placeID)){
                                result.push(alerts[j].visits[k]);
                            }
                        }
                    }
                    res.status(200).json(result);
                }
            });
        }
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;