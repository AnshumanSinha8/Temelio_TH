// Creating an App.js additionally to index.js in this project's root level.
// This is to allow our testing enviornment to import the app from here without needing to automatically start the server
const express = require('express');
const app = express();
const nonprofitRoutes = require('./routes/nonprofitRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Body parser middleware
app.use(express.json());

// Mount routes
app.use('/nonprofits', nonprofitRoutes);
app.use('/emails', emailRoutes);

module.exports = app;
