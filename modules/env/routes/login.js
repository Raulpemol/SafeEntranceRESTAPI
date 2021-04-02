const express = require('express');
const route = express.Router();

route.post('/', async (req, res) => {
    try{
        const user = process.env.SYSADMIN_USERNAME;
        const pass = process.env.SYSADMIN_PASSWORD;

        if(user == undefined || user == null || user == "" ||
            pass == undefined || pass == null || pass == ""){
            res.status(500).json("Error connecting to server");
        }
        else{
            if(req.body.username == user && req.body.password == pass){
                res.status(200);
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

module.exports = route;