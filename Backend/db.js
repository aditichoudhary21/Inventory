const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'harshit',         // Your PostgreSQL username
  host: 'localhost',
  database: 'Inventory',   // Your database name
  password: '88961',       // Your PostgreSQL password
  port: 5432,              // Default PostgreSQL port
});

// Function to connect to PostgreSQL (optional for querying)
const connectToPostgres = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL successfully");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL", err);
  }
};

// Export the pool for querying
module.exports = { connectToPostgres, pool };
