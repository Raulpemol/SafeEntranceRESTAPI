const mongoose = require('mongoose');

const dbConnection = async (URI) => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = dbConnection;