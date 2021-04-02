const express = require('express');
const route = express.Router();

const jwt = require('jsonwebtoken');

route.post('/', async (req, res) => {
    try{
        const user = process.env.SYSADMIN_USERNAME;
        const pass = process.env.SYSADMIN_PASSWORD;

        if(user == undefined || user == null || user == "" ||
            pass == undefined || pass == null || pass == ""){
            res.status(500).json("Error connecting to server");
        }
        else{
            if(req.body.username == "user" && req.body.password == "pass"){
                var token = jwt.sign(
                    {
                        user: req.body.username,
                        time: Date.now()/1000
                    },
                    "encrypted"
                );

                res.status(200);
                res.json({
                    admin: true,
                    token: token
                });
            }
            else{
                res.status(403).json("Wrong credentials");
            }
        }
    }
    catch{
        res.status(403).json("Forbidden");
    }
});

route.get('/panel', async (req, res) => {
    var token = req.headers['token'] || req.body.token || req.query.token;
    if (token != null) {
        jwt.verify(token, 'encrypted', function(err, infoToken) {
            if (err || (Date.now()/1000 - infoToken.tiempo) > 240 ){
                res.status(403);
                res.json({ 
                    acceso : false, 
                    error: 'Token invalido o caducado'
                });
            } 
            else {
                res.status(200).send("OK");
            }
        });
    } 
    else {
        res.status(403);
        res.json({ 
            acceso : false, 
            mensaje: 'No hay Token'
        });
    }
});

module.exports = route;