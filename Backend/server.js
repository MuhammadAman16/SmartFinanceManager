const express = require("express");
const { poolPromise } = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
