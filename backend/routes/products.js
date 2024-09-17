const express = require('express');
const router = express.Router();
const { sql } = require('../dbConfig');

// Fetch all products
router.get('/', async (req, res) => {
  const request = new sql.Request();
  try {
    const result = await request.query('SELECT * FROM Production.Product');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err });
  }
});

// Fetch a product by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  try {
    const result = await request.input('id', sql.Int, id).query('SELECT * FROM Production.Product WHERE ProductID = @id');
    if (result.recordset.length === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product', error: err });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { Name, ProductNumber, MakeFlag, FinishedGoodsFlag, Color, SafetyStockLevel, ReorderPoint, StandardCost, ListPrice } = req.body;
  const request = new sql.Request();
  try {
    // SQL query to insert a new product
    await request.input('Name', sql.NVarChar, Name)
      .input('ProductNumber', sql.NVarChar, ProductNumber)
      .input('MakeFlag', sql.Bit, MakeFlag)
      .input('FinishedGoodsFlag', sql.Bit, FinishedGoodsFlag)
      .input('Color', sql.NVarChar, Color)
      .input('SafetyStockLevel', sql.SmallInt, SafetyStockLevel)
      .input('ReorderPoint', sql.SmallInt, ReorderPoint)
      .input('StandardCost', sql.Money, StandardCost)
      .input('ListPrice', sql.Money, ListPrice)
      .query(`
        INSERT INTO Production.Product (Name, ProductNumber, MakeFlag, FinishedGoodsFlag, Color, SafetyStockLevel, ReorderPoint, StandardCost, ListPrice) 
        VALUES (@Name, @ProductNumber, @MakeFlag, @FinishedGoodsFlag, @Color, @SafetyStockLevel, @ReorderPoint, @StandardCost, @ListPrice)
      `);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
});

// Update an existing product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, ProductNumber, MakeFlag, FinishedGoodsFlag, Color, SafetyStockLevel, ReorderPoint, StandardCost, ListPrice } = req.body;
  const request = new sql.Request();
  try {
    // SQL query to update an existing product by ID
    await request.input('id', sql.Int, id)
      .input('Name', sql.NVarChar, Name)
      .input('ProductNumber', sql.NVarChar, ProductNumber)
      .input('MakeFlag', sql.Bit, MakeFlag)
      .input('FinishedGoodsFlag', sql.Bit, FinishedGoodsFlag)
      .input('Color', sql.NVarChar, Color)
      .input('SafetyStockLevel', sql.SmallInt, SafetyStockLevel)
      .input('ReorderPoint', sql.SmallInt, ReorderPoint)
      .input('StandardCost', sql.Money, StandardCost)
      .input('ListPrice', sql.Money, ListPrice)
      .query(`
        UPDATE Production.Product 
        SET Name = @Name, ProductNumber = @ProductNumber, MakeFlag = @MakeFlag, FinishedGoodsFlag = @FinishedGoodsFlag, Color = @Color, SafetyStockLevel = @SafetyStockLevel, ReorderPoint = @ReorderPoint, StandardCost = @StandardCost, ListPrice = @ListPrice
        WHERE ProductID = @id
      `);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
});

// Delete a product by its ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  try {
    // SQL query to delete a product by ID
    await request.input('id', sql.Int, id).query('DELETE FROM Production.Product WHERE ProductID = @id');
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
});

module.exports = router;
