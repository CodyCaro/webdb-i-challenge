const express = require("express");

// const db = require("./data/dbConfig.js");
const BudgetRouter = require("./data/budget-router");

const server = express();

server.use(express.json());

server.use("/api/budgets", BudgetRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex<h3>");
});

module.exports = server;
