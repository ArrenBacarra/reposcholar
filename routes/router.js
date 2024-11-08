
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Existing routes
router.get('/login', userController.users);
router.get('/register', userController.registration);
router.get('/home', userController.home);
router.get('/profile', userController.profile);
router.get('/verify-email', userController.verifyEmail);

router.post('/register', userController.registrationHandler);
router.post('/login', userController.loginHandler);

// New routes for updating profile
router.get('/update-profile', userController.updateProfilePage); // Show update form
router.post('/update-profile', userController.updateProfile);    // Handle form submission

module.exports = router;
