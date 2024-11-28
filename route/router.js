const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const db = require('../config/db');

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
    next(); // Proceed if authenticated
};

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out.' }); // Handle errors
        }
        res.clearCookie('connect.sid', { path: '/' }); // Clear the session cookie
        return res.status(200).json({ message: 'Logged out successfully.' }); // Return JSON response
    });
});

// Define routes
router.get('/verify-email', userController.verifyEmail);
router.get('/register', userController.registration);
router.get('/login', userController.users);
router.post('/register', userController.registrationHandler); // Handle registration
router.post('/login', userController.loginHandler); // Handle login
router.get('/userprofile', userController.getUserProfile);

router.get('/userprofile/:id', isAuthenticated, userController.getUserProfileById);
router.put('/userprofile/:id', isAuthenticated, userController.updateUserProfile);

router.put('/updateprofile', userController.updateUserProfile);

router.post('/reset-password-request', userController.resetPasswordRequest);
router.get('/reset-password', userController.verifyResetToken);
router.post('/reset-password', userController.resetPassword);



module.exports = router; // Export the router for use in app.js