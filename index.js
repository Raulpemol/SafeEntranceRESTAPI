const express = require('express');
const getDBConnection = require('./modules/DBManager');

const app = express();
const URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD?retryWrites=true&w=majority";
getDBConnection(URI);

app.use(express.json({extended : false}));
app.use('/api/places', require('./modules/api/routes/place'));
app.use('/api/alerts', require('./modules/api/routes/alert'));

const hostname = process.env.WEBSITE_HOSTNAME || 'localhost';
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! The app is now running CD/CI from US')
})

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}`))