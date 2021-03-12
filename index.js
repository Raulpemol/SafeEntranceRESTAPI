const express = require('express');
const getDBConnection = require('./modules/DBManager');

const app = express();

getDBConnection();

app.use(express.json({extended : false}));
app.use('/api/addPlace', require('./modules/api/routes/place'))

const hostname = process.env.WEBSITE_HOSTNAME || 'localhost';
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! The app is now running CD/CI from US')
})

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}`))