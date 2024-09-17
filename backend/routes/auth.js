const express = require('express');
const router = express.Router();
const { sql, connectToDB } = require('../dbConfig');

// Handles the login route
router.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Establishes connection to the database
    await connectToDB();

    // SQL query to validate the user
    const result = await sql.query(`
      SELECT * FROM Person.Person
      WHERE LastName = '${username}' AND password = '${password}' AND PersonType = 'EM'
    `);

    if (result.recordset.length > 0) {
      // User found
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid credentials or user not found
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
