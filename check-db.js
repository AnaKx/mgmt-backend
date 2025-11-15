require('dotenv').config();
const pool = require('./config/database');

pool.query('SELECT * FROM users')
  .then(result => {
    console.log('Users table exists!');
    console.log('Current row count:', result.rows.length);
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });