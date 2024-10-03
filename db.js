const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotel';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',() => {
    console.log('Connected to mongo server');
})

db.on('disconnected',() => {
    console.log('mongo server disconnected');
})

db.on('error',() => {
    console.log('Mongo connection error',err);
})

module.exports = db;