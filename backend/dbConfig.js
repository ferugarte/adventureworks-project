const sql = require('mssql');
require('dotenv').config(); // Load environment variables from .env file

// Database connection configuration using environment variables
const config = {
  user: process.env.DB_USER,  // Read the database user from .env
  password: process.env.DB_PASSWORD,  // Read the password from .env
  server: process.env.DB_SERVER,  // Read the server address from .env
  port: parseInt(process.env.DB_PORT, 10),  // Read and convert the port number from .env
  database: process.env.DB_DATABASE,  // Read the database name from .env
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',  // Convert string value to boolean
    enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',  // Convert string value to boolean
  },
  connectionTimeout: 30000,  // Increase connection timeout for the database
};

// Function to establish a connection to the database
async function connectToDB() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (err) {
    console.log('Database connection error: ', err);
  }
}

module.exports = { connectToDB, sql };
