// model/userModel.js
const db = require('../config/db');

const userModel = {

    create: (data, callback) => {
        const query = "INSERT INTO users (email, password, verification_token) VALUES (?, ?, ?)";
        db.query(query, [data.email, data.password, data.verification_token], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get user by email (for login)
    findByEmail: (email, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error('Error finding user by email:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    findById: (userId, callback) => {
        const query = "SELECT * FROM users WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                console.error('Error finding user by ID:', err);
                return callback(err);
            }
            callback(null, result[0]); // Return the first result (user)
        });
    },

    updateUser: (userId, data, callback) => {
        const query = `
            UPDATE users SET 
                lastname = ?, 
                firstname = ?, 
                m_initial = ?, 
                gender = ?, 
                degree_program = ?, 
                year_level = ?, 
                phone_number = ?, 
                student_status = ?, 
                birthday = ?, 
                zipcode = ?, 
                unit = ?
            WHERE id = ?
        `;
        db.query(query, [
            data.lastname, data.firstname, data.m_initial, data.gender, data.degree_program,
            data.year_level, data.phone_number, data.student_status, data.birthday,
            data.zipcode, data.unit, userId
        ], (err, result) => {
            if (err) {
                console.error('Error updating user profile:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get user by verification token
    findByVerificationToken: (token, callback) => {
        const query = "SELECT * FROM users WHERE verification_token = ?";
        db.query(query, [token], (err, result) => {
            if (err) {
                console.error('Error finding user by verification token:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Update user's verification status
    updateVerificationStatus: (userId, callback) => {
        const query = "UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                console.error('Error updating verification status:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get all users
    getAll: (callback) => {
        const query = "SELECT * FROM users";
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving all users:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = userModel;