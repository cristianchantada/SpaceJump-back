'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
	console.log('Connection error', err);
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB in', mongoose.connection.name);
});

mongoose.connect(process.env.MOGODB_CONNECTION_STR);

module.exports = mongoose.connection;
