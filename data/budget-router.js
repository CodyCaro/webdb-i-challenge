const express = require("express");

const db = require("./dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .select("*")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        message: "problem with the database."
      });
    });
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
