const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const routes = require('./routes/router.js');
const session = require('express-session');

app.set("view engine", 'ejs');

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Set up the session middleware before your routes
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Define your routes after setting up middleware
app.use('/', routes);

app.listen(5555, () => {
    console.log('Server is running on http://localhost:5555/login');
});