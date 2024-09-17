const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./dbConfig');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth'); // Import authentication routes

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:4200' // Allow requests from the frontend
}));

// Middleware to parse JSON payloads
app.use(express.json());

// Establish a connection to the database
connectToDB();

// Product routes
app.use('/api/products', productsRoutes);

// Authentication routes
app.use(authRoutes); // Handles /api/auth/login

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
