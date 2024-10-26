const express = require('express');
const router = express.Router();
const { pool } = require('../db'); // Import the pool from db.js


// Route to insert a product
router.post('/insertproduct', async (req, res) => {
    //add a console log
    console.log("insert product");
    const { productname, description, price, quantity } = req.body; // Use lowercase keys

    // Validate input
    if (!productname || !description || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const query = `
            INSERT INTO products (productname, description, price, quantity) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [productname, description, price, quantity];
        
        const result = await pool.query(query, values); // Use pool.query for database interaction
        const product = result.rows[0];
        console.log(product);
        res.status(201).json(result.rows[0]); // Return the inserted product
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        const result = await pool.query (query);
        res.status(200).json(result.rows); // Return the products
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// Route to update a product
router.put('/updateproduct/:id', async (req, res) => {
    const { id } = req.params;
    const { productname, description, price, quantity } = req.body;

    // Validate input
    if (!productname || !description || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const query = `
            UPDATE products SET productname = $1, description = $2, price = $3, quantity = $4 
            WHERE productid = $5 RETURNING *`;
        const values = [productname, description, price, quantity, id];

        const result = await pool.query(query, values);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(result.rows[0]); // Return the updated product
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// Route to delete a product
router.delete('/deleteproduct/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM products WHERE productid = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
//Router to fetch a product
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT * FROM products WHERE productid = $1';
        const result = await pool.query(query, [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(result.rows[0]); // Return the product
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
    
});

module.exports = router;
