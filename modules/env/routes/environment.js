const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const EnvVariable = require('../models/envVariable');

route.get('/getVariables', async (req, res) => {
    try{
        EnvVariable.find(function(err, variables){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                res.status(200).json(variables);
            }
        });
    }    
    catch{
        res.status(500).json("Error proccessing your request");
    }
});

route.get('/getVariable/:name', async (req, res) => {
    try{
        const name = req.params.name;
        EnvVariable.findOne({name: name}, function(err, variable){
            if(err){
                console.log(err);
                res.status(500).json("Error accessing the database");
            }
            else{
                if(variable == null || variable == undefined){
                    res.status(404).json("The provided variable does not exist");
                }
                else{
                    res.status(200).json(variable.value);
                }
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

route.post('/setVariable', async (req, res) => {
    try{
        const name = req.body.name;
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
                EnvVariable.findOne({name: name}, function(err, variable){
                    if(err){
                        console.log(err);
                        res.status(500).json("Error accessing the database");
                    }
                    else{
                        const value = Number.parseInt(req.body.value);
                        if(isNaN(value)){
                            res.status(400).json("Invalid request parameters");
                            return;
                        }
                        if(variable == null){
                            variable = new EnvVariable({
                                _id: new mongoose.Types.ObjectId(),
                                name: name,
                                value: value
                            });
                            
                        }
                        else{
                            variable.value = value;
                        }

                        variable.save().then(result => {
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