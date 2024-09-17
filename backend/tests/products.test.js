const request = require('supertest');
const express = require('express');
const productsRoutes = require('../routes/products');
const { sql } = require('../dbConfig');

// Mocking the database to simulate its behavior for testing
jest.mock('../dbConfig', () => ({
  sql: {
    Request: jest.fn(() => ({
      query: jest.fn(),  // Mocking the query method
      input: jest.fn().mockReturnThis()  // Mocking the input method and allowing method chaining
    }))
  }
}));

const app = express();
app.use(express.json());
app.use('/api/products', productsRoutes);

describe('Products Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test to ensure a clean state
  });

  it('should return 200 and a list of products', async () => {
    const mockProducts = {
      recordset: [
        { ProductID: 1, Name: 'Product 1', ProductNumber: 'P001' },
        { ProductID: 2, Name: 'Product 2', ProductNumber: 'P002' }
      ]
    };
    
    // Simulating a successful SQL query response for retrieving products
    sql.Request.mockImplementation(() => ({
      query: jest.fn().mockResolvedValue(mockProducts)  // Mocking the SQL query
    }));

    const response = await request(app).get('/api/products');

    // Expecting a 200 status code and an array of products
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].Name).toBe('Product 1');
  });

  it('should return 404 if product not found', async () => {
    // Simulating a SQL query response indicating no product was found
    sql.Request.mockImplementation(() => ({
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [] })  // Mocking a response with no products
    }));

    const response = await request(app).get('/api/products/1');

    // Expecting a 404 status code and a message indicating the product was not found
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  it('should create a new product and return 201', async () => {
    // Simulating a successful creation of a product in the database
    sql.Request.mockImplementation(() => ({
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({})  // Mocking a successful creation response
    }));

    const newProduct = {
      Name: 'New Product',
      ProductNumber: 'NP001',
      MakeFlag: true,
      FinishedGoodsFlag: true,
      Color: 'Red',
      SafetyStockLevel: 10,
      ReorderPoint: 5,
      StandardCost: 100,
      ListPrice: 150
    };

    const response = await request(app).post('/api/products').send(newProduct);

    // Expecting a 201 status code and a success message for the created product
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Product created successfully');
  });

  it('should return 500 if there is a database error', async () => {
    // Simulating a database error when attempting to execute the SQL query
    sql.Request.mockImplementation(() => ({
      query: jest.fn().mockRejectedValue(new Error('Database error'))  // Mocking a database error
    }));

    const response = await request(app).get('/api/products');

    // Expecting a 500 status code and an error message for the failed retrieval
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Error retrieving products');
  });
});
