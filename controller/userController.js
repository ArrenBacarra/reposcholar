const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userModel = require('../model/userModel');

const userController = {

    users: (req, res) => {
        res.render('users/login', { error: null });
    },
    // Render registration view
    registration: (req, res) => {
        res.render('users/registration', { error: null });
    },

    // Handle user registration with password hashing and verification email
    registrationHandler: async (req, res) => {
        const { email, password } = req.body;

        // Check if the email is already registered
        userModel.findByEmail(email, async (err, users) => {
            if (err) {
                return res.status(500).send('Error checking user.');
            }
            if (users.length > 0) {
                return res.render('users/registration', { error: 'This email is already registered.' });
            }

            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Generate a unique verification token
                const verificationToken = crypto.randomBytes(32).toString('hex');

                // Insert user into the database with hashed password and verification token
                userModel.create({ email, password: hashedPassword, verification_token: verificationToken }, (err, result) => {
                    if (err) {
                        return res.status(500).send('Error registering user.');
                    }

                    // Send verification email
                    const verificationUrl = `http://localhost:5555/verify-email?token=${verificationToken}`;
                    const mailOptions = {
                        from: 'your_email@gmail.com', // This should be your verified email address
                        to: email, // Send to the email entered during registration
                        subject: 'Email Verification',
                        text: `Please verify your email by clicking the link: ${verificationUrl}`
                    };

                    // Configure Nodemailer transporter
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'arrenbacarra442@gmail.com', // Your Gmail address
                            pass: 'kbnz dckp iwoc jhgt' // Use app-specific password if 2FA is enabled
                        }
                    });

                    // Send the email
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log('Error sending email:', err);
                            return res.status(500).send('Error sending verification email.');
                        }
                        console.log('Verification email sent:', info.response);
                        res.redirect('/login'); // Redirect to login page after successful registration
                    });
                });
            } catch (err) {
                res.status(500).send('Error hashing password.');
            }
        });
    },

    // Handle email verification
    verifyEmail: (req, res) => {
        const { token } = req.query;

        userModel.findByVerificationToken(token, (err, users) => {
            if (err || users.length === 0) {
                return res.status(400).send('Invalid or expired verification token.');
            }

            const user = users[0];
            userModel.updateVerificationStatus(user.id, (err) => {
                if (err) {
                    return res.status(500).send('Error verifying email.');
                }
                res.send('Your email has been verified! You may now log in.'); // Feedback after verification
            });
        });
    },

    // Handle user login
    loginHandler: async (req, res) => {
        const { email, password } = req.body;
    
        userModel.findByEmail(email, async (err, users) => {
            if (err || users.length === 0) {
                return res.render('users/login', { error: 'This account is not registered.' });
            }
    
            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).render('users/login', { error: 'Incorrect password.' });
            }
    
            if (!user.is_verified) {
                return res.status(401).render('users/login', { error: 'Please verify your email before logging in.' });
            }
    
            req.session.userId = user.id; // Store user id in session
    
            // Redirect to home page after successful login
            res.redirect('/home');
        });
    },
    

    home: (req, res) => {
        res.render('home', { error: null });
    },

    profile: (req, res) => {
        const userId = req.session.userId;
        userModel.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send('Error retrieving user data.');
            }
            res.render('profile', { user }); // Pass user data to the view
        });
    },
    updateProfilePage: (req, res) => {
        const userId = req.session.userId;
        userModel.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send('Error retrieving user data for update.');
            }
            res.render('update-profile', { user });
        });
    },

    updateProfile: (req, res) => {
        const userId = req.session.userId;
        const updatedData = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            m_initial: req.body.m_initial,
            gender: req.body.gender,
            degree_program: req.body.degree_program,
            year_level: req.body.year_level,
            phone_number: req.body.phone_number,
            student_status: req.body.student_status,
            birthday: req.body.birthday,
            zipcode: req.body.zipcode,
            unit: req.body.unit
        };

        userModel.updateUser(userId, updatedData, (err) => {
            if (err) {
                return res.status(500).send('Error updating user profile.');
            }
            res.redirect('profile'); // Redirect to profile page after update
        });
    }

    
};

module.exports = userController;