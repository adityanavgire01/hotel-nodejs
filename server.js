const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

// Import routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Middleware
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
    res.send("Welcome to the hotel API");
});

// Use routes
app.use('/api/persons', personRoutes);
app.use('/api/menu-items', menuItemRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});