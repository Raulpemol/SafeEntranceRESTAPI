const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const EnvVariable = require('../models/envVariable');

route.get('/idbp', async (req, res) => {
    try{
        EnvVariable.findOne({name: "idbp"}, function(err, idbp){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(idbp.value);
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.post('/setidbp', async (req, res) => {
    try{
        var token = req.headers['token'] || req.body.token || req.query.token;
        jwt.verify(token, 'encrypted', function(err, infoToken) {
            if (err || (Date.now()/1000 - infoToken.tiempo) > 240 ){
                res.status(403);
                res.json({ 
                    acceso : false, 
                    error: 'Token invalido o caducado'
                });
            } 
            else {
                EnvVariable.findOne({name: "idbp"}, function(err, idbp){
                    if(err){
                        console.log(err);
                        res.status(500).json("Error accessing the database");
                    }
                    else{
                        const value = req.body.value;
                        if(idbp == null){
                            idbp = new EnvVariable({
                                _id: new mongoose.Types.ObjectId(),
                                name: "idbp",
                                value: value
                            });
                            
                        }
                        else{
                            idbp.value = value;
                        }

                        idbp.save().then(result => {
                            console.log(result);
                            res.status(201).json("Value changed");
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json("Error updating the value");
                        });
                    }
                });
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.get('/dapi', async (req, res) => {
    try{
        EnvVariable.findOne({name: "dapi"}, function(err, dapi){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(dapi.value);
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.post('/setdapi', async (req, res) => {
    try{
        var token = req.headers['token'] || req.body.token || req.query.token;
        jwt.verify(token, 'encrypted', function(err, infoToken) {
            if (err || (Date.now()/1000 - infoToken.tiempo) > 240 ){
                res.status(403);
                res.json({ 
                    acceso : false, 
                    error: 'Token invalido o caducado'
                });
            } 
            else {
                EnvVariable.findOne({name: "dapi"}, function(err, dapi){
                    if(err){
                        console.log(err);
                        res.status(500).json("Error accessing the database");
                    }
                    else{
                        const value = req.body.value;
                        if(dapi == null){
                            dapi = new EnvVariable({
                                _id: new mongoose.Types.ObjectId(),
                                name: "dapi",
                                value: value
                            });
                            
                        }
                        else{
                            dapi.value = value;
                        }

                        dapi.save().then(result => {
                            console.log(result);
                            res.status(201).json("Value changed");
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json("Error updating the value");
                        });
                    }
                });
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.get('/mfdc', async (req, res) => {
    try{
        EnvVariable.findOne({name: "mfdc"}, function(err, mfdc){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(mfdc.value);
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.post('/setmfdc', async (req, res) => {
    try{
        var token = req.headers['token'] || req.body.token || req.query.token;
        jwt.verify(token, 'encrypted', function(err, infoToken) {
            if (err || (Date.now()/1000 - infoToken.tiempo) > 240 ){
                res.status(403);
                res.json({ 
                    acceso : false, 
                    error: 'Token invalido o caducado'
                });
            } 
            else {
                EnvVariable.findOne({name: "mfdc"}, function(err, mfdc){
                    if(err){
                        console.log(err);
                        res.status(500).json("Error accessing the database");
                    }
                    else{
                        const value = req.body.value;
                        if(mfdc == null){
                            mfdc = new EnvVariable({
                                _id: new mongoose.Types.ObjectId(),
                                name: "mfdc",
                                value: value
                            });
                            
                        }
                        else{
                            mfdc.value = value;
                        }

                        mfdc.save().then(result => {
                            console.log(result);
                            res.status(201).json("Value changed");
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json("Error updating the value");
                        });
                    }
                });
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;