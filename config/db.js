const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdb'
});

db.connect((err) =>{
    if(err) throw err;
    console.log('connectedd to mysql')
});


module.exports = db;