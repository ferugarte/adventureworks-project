const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const { sql } = require('../dbConfig');

// Mocking the database module to simulate its behavior for testing
jest.mock('../dbConfig', () => ({
  sql: {
    query: jest.fn()  // Mocking the query method to control its output
  },
  connectToDB: jest.fn()
}));

const app = express();
app.use(express.json());
app.use(authRoutes);

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test to ensure a clean state
  });

  it('should return 200 and a success message for a valid login', async () => {
    const mockUser = {
      recordset: [{ LastName: 'Doe', password: 'password123', PersonType: 'EM' }]
    };
    
    // Simulating a successful SQL query response for valid credentials
    sql.query.mockResolvedValue(mockUser);

    const response = await request(app).post('/api/auth/login').send({
      username: 'Doe',
      password: 'password123'
    });

    // Expecting a 200 status code and a success message
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should return 401 for invalid credentials', async () => {
    // Simulating a SQL query response indicating no user was found
    sql.query.mockResolvedValue({ recordset: [] });

    const response = await request(app).post('/api/auth/login').send({
      username: 'Doe',
      password: 'wrongpassword'
    });

    // Expecting a 401 status code and an invalid credentials message
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 500 on database error', async () => {
    // Simulating a database error when attempting to execute the SQL query
    sql.query.mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/api/auth/login').send({
      username: 'Doe',
      password: 'password123'
    });

    // Expecting a 500 status code and an internal server error message
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });
});
