import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const db = new sqlite3.Database("./src/data.db");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  db.all(
    req.query.category
      ? `SELECT * FROM products WHERE category = '${req.query.category}' AND released = true`
      : "SELECT * FROM products WHERE released = true",
    [],
    (err, result) => {
      if (err) {
        res.status(500).send("Error running query");
      }
      console.log(
        `SELECT * FROM products WHERE category = '${req.query.category}' AND released = true`
      );
      res.status(200).send(result);
    }
  );
});

app.listen(3000, () => {
  console.log(`Running on http://localhost:${3000}`);
});
