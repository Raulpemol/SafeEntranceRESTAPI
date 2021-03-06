const URI = "mongodb+srv://admin:VXm8s3Up4BLK86HS@safeentrancebd.riy03.mongodb.net/SafeEntranceBD?retryWrites=true&w=majority";
const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = dbConnection;