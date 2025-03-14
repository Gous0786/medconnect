require('dotenv').config();

module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI
    }
}; 