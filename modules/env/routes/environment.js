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
                const value = req.body.value;
                if(value == undefined || value == null || value == ""){
                    res.status(400).json("Incorrect value");
                }
                else{
                    process.env.INFECT_DAYS_BEFORE_PCR = value;
                    res.status(200).json("Value changed");
                }
            }
        });
    }
    catch{
        res.status(400).json("Incorrect parameter format");
    }
});

module.exports = route;