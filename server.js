const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  console.log("getting accounts");
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        message: "problem with the database."
      });
    });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db("accounts")
    .select("*")
    .where({ id })
    .then(account => {
      console.log(account);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "problem with the database."
      });
    });
});

server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(account => {
      res.status(201).json({
        message: "Account Created Successfully",
        account: {
          name: account.name,
          id: account.id,
          budget: account.budget
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "problem with the database."
      });
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(req.body)
    .then(account => {
      if (account) {
        res.status(200).json({ updated: account });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch();
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .del()
    .then(account => {
      if (account) {
        res.status(200).json({ deleted: account });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    });
});

module.exports = server;
