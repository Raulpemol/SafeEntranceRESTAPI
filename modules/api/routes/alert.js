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
        if(req.body.visits[i].placeID != undefined && req.body.visits[i].enterDateTime != undefined && req.body.visits[i].exitDateTime != undefined){
            const visit = new Visit({
                placeID: req.body.visits[i].placeID,
                enterDateTime: req.body.visits[i].enterDateTime,
                exitDateTime: req.body.visits[i].exitDateTime
            });
            visitArray[i] = visit;
        }
        else{
            res.status(400).json("Some visits have an invalid format");
            return;
        }
    }

    if(req.body.symptomsDate == undefined || req.body.alertDate == undefined || req.body.state == undefined){
        res.status(400).json("Invalid alert format");
        return;
    }
    const alert = new Alert({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        symptomsDate: req.body.symptomsDate,
        alertDate : req.body.alertDate,
        validationDate: null,
        state: req.body.state,
        visits : visitArray
    });
    alert.save().then(() => {
            res.status(201).json(alert._id);
    }).catch(err => {
        res.status(500).json("Error registering the alert");
    });
});

route.post('/getAffectingAlerts', async (req, res) => {
    try{
        let result = new Array();
        if(req.body.places == undefined || req.body.fromDate == undefined || req.body.exclude == undefined){
            res.status(400).json("Invalid request parameters");
            return;
        }
        let fromDate = req.body.fromDate;
        let places = req.body.places;
        let excludeIds = req.body.exclude;
        if(places.length > 0){
            Alert.find({state: VALID_ALERT_STATE, _id: {"$nin": excludeIds}, alertDate: {"$gte": fromDate}, "visits.placeID": { "$in": places }}, function(err, alerts){
                if(err){
                    res.status(500).json("Error accessing the database");
                }
                else{
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
        else{
            res.status(200).json(result);
        }
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.get('/getNotValidated', async (req, res) => {
    try{
        Alert.find({state: CREATED_ALERT_STATE}, function (err, alerts){
            if(err){
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(alerts);
            }
        });
    }
    catch{
        res.status(500).json("Error connecting to server");
    }
});

route.post('/validate', async (req, res) => {
    try{
        const id = req.body._id;
        if(id == undefined || id == null){
            res.status(400).json("Incorrect parameter format");
        }
        else{
            Alert.findOne({_id: id}, function (err, alert){
                if(err){
                    res.status(500).json("Error accessing the database");
                }
                else{
                    if(alert == null || alert == undefined){
                        res.status(404).json("Wrong alert identifier");
                    }
                    else{
                        alert.state = VALID_ALERT_STATE;
                        alert.save().then(() => {
                            res.status(200).json(alert._id);
                        }).catch(err => {
                            res.status(500).json("Error registering the alert");
                        });
                    }
                }
            });
        }
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.post('/deleteNotValid', async (req, res) => {
    try{
        const id = req.body._id;
        if(id == undefined || id == null){
            res.status(400).json("Incorrect parameter format");
        }
        else{
            Alert.findOne({_id: id}, function (err, alert){
                if(err){
                    res.status(500).json("Error accessing the database");
                }
                else{
                    if(alert.state == CREATED_ALERT_STATE){
                        Alert.deleteOne({_id: id}, function (err){
                            if(err){
                                res.status(500).json("Error accessing theee database");
                            }
                            else{
                                res.status(200).json("Alert deleted");
                            }
                        });
                    }
                    else{
                        res.status(400).json("The alert is valid");
                    }
                }
            });
        }
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;