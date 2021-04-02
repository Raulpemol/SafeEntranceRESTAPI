const express = require('express');
const route = express.Router();

route.get('/idbp', async (req, res) => {
    try{
        const value = process.env.INFECT_DAYS_BEFORE_PCR;
        if(value == undefined || value == null || value == ""){
            res.status(500).json("Error connecting to server");
        }
        else{
            res.status(200).json(value);
        }
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;