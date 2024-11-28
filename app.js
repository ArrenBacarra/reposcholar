const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const router = require('./route/router'); // Import the router file

const app = express();

// Set up view engine
app.set("view engine", 'ejs');

// Middleware configuration
app.use(cors({ origin: 'http://localhost:8080', credentials: true })); // Adjust origin if different
app.use(bodyParser.json()); // Parses JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.static('public'));

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 3600000 // 1 hour session expiry
  }
}));

// Use the router for all defined routes
app.use('/', router);

// Start server
app.listen(5555, () => {
    console.log('Server is running on http://localhost:5555/login');
});