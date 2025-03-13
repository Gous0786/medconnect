require('dotenv').config();

module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI
    },
    deepseek: {
        apiKey: process.env.DEEPSEEK_API_KEY
    }
}; 