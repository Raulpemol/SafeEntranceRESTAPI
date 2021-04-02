const express = require('express');
const route = express.Router();

route.post('/login', async (req, res) => {
    try{
        const user = process.env.SYSADMIN_USERNAME;
        const pass = process.env.SYSADMIN_PASSWORD;

        if(user == undefined || user == null || user == "" ||
            pass == undefined || pass == null || pass == ""){
            req.session.user = null;
            res.status(500).json("Error connecting to server");
        }
        else{
            if(req.body.username == user && req.body.password == pass){
                req.session.user = req.body.username;
                res.status(200);
            }
            else{
                req.session.user = null;
                res.status(403).json("Wrong credentials");
            }
        }
    }
    catch{
        req.session.user = null;
        res.status(403).json("Forbidden");
    }
});

route.get('/logout', async (req, res) => {
    req.session.user = null;
    res.status(200).send("Usuario desconectado");
});

module.exports = route;