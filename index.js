const express = require('express');
const app = express();
const hostname = process.env.WEBSITE_HOSTNAME || 'localhost';
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! The app is now running CD/CI from US')
})

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}`))