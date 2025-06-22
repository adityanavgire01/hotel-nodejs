const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB URIs from environment variables
// const mongoLocalURL = process.env.MONGODB_LOCAL_URI || "mongodb://localhost:27017/hotel";
const mongoAtlasURL = process.env.MONGODB_ATLAS_URI;

// Choose which connection to use (Atlas if available, otherwise local)
const mongoURL = mongoAtlasURL || mongoLocalURL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// this maintains a default connection object
const db = mongoose.connection;

// event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server:', mongoURL.includes('mongodb+srv') ? 'Atlas' : 'Local');
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});
db.on('error', (err) => {
    console.log('Error connecting to MongoDB server:', err);
});

// export the database connection
module.exports = db;
