const express = require('express');
const getDBConnection = require('./modules/DBManager');
const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
var DB_URI = "";

if(NODE_ENV !== 'test'){
    DB_URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD?retryWrites=true&w=majority";
}
else{
    DB_URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD_test?retryWrites=true&w=majority";
}

getDBConnection(DB_URI);

app.use(express.json({extended : false}));

app.use('/api/places', require('./modules/api/routes/place'));
app.use('/api/alerts', require('./modules/api/routes/alert'));
app.use('/env', require('./modules/env/routes/environment'));
app.use('/admin', require('./modules/env/routes/login'));

const hostname = process.env.WEBSITE_HOSTNAME || 'localhost';
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST de SafeEntrance')
});

var server = app.listen(port, () => console.log(`Server running at http://${hostname}:${port}`));

module.exports = server;