const db = require('../config/db');

const userModel = {
    // Register a new user
    create: (data, callback) => {
      const query = 'INSERT INTO users (email, password, verification_token) VALUES (?, ?, ?)';
      db.query(query, [data.name, data.email, data.password, data.verification_token], callback);
    },

    // Get user by email (for login)
    findByEmail: (email, callback) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], callback);
    },

    // Get user by verification token
    findByVerificationToken: (token, callback) => {
      const query = 'SELECT * FROM users WHERE verification_token = ?';
      db.query(query, [token], callback);
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
    findById: (userId, callback) => {
        const query = "SELECT * FROM users WHERE id = ?";
        db.query(query, [userId], (err, result) => {
          if (err) {
            console.error('Error finding user by ID:', err);
            return callback(err);
          }
          callback(null, result[0]); // Return the first result
        });
      },

        // Update user's verification status without nullifying verification_token
        updateVerificationStatus: (userId, callback) => {
          const query = 'UPDATE users SET is_verified = 1 WHERE id = ?';
          db.query(query, [userId], callback);
        },

getUserProfile:(userId, callback) => {
    const sql = `SELECT firstname, m_initial, lastname, gender, degree_program, year_level, email, phone_number, student_status, birthday, zipcode, unit FROM users WHERE id = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); // Return the first result (assuming unique user ID)
    });
  },

  updateUserProfile: (userId, updatedData, callback) => {
    const {
      firstname,
      m_initial,
      lastname,
      gender,
      degree_program,
      year_level,
      phone_number,
      student_status,
      birthday,
      zipcode,
      unit,
    } = updatedData;
  
    const sql = `UPDATE users SET firstname = ?, m_initial = ?, lastname = ?, gender = ?, degree_program = ?, year_level = ?, phone_number = ?, student_status = ?, birthday = ?, zipcode = ?, unit = ? WHERE id = ?`;
    db.query(
      sql,
      [firstname, m_initial, lastname, gender, degree_program, year_level, phone_number, student_status, birthday, zipcode, unit, userId],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      }
    );
  },

  updateResetToken: (userId, token, callback) => {
    const query = 'UPDATE users SET reset_token = ? WHERE id = ?';
    db.query(query, [token, userId], callback);
  },

  // Find user by reset token
  findByResetToken: (token, callback) => {
    const query = 'SELECT * FROM users WHERE reset_token = ?';
    db.query(query, [token], callback);
  },

  // Update user password
  updatePassword: (userId, newPassword, callback) => {
    const query = 'UPDATE users SET password = ?, reset_token = NULL WHERE id = ?';
    db.query(query, [newPassword, userId], callback);
  },
};

module.exports = userModel;