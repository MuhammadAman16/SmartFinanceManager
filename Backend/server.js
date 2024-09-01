const express = require("express");
// const { poolPromise } = require("./config/db.js");
const db = require('./models');
const syncDatabase = require('./config/dbconfig'); // Import syncDatabase


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Example route to fetch users
app.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll(); // Assuming you have a User model defined
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.get("/user", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        select * from [dbo].[test]
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Start server and synchronize database
const startServer = async () => {
  try {
    await syncDatabase(); // Ensure the database is synced before starting the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
