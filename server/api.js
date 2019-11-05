const express = require("express");
const apiRouter = express.Router();
const db = require("./db");

apiRouter.get("/minions", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  if (minions) {
    res.send(minions);
  } else {
    res.send([]);
  }
});

apiRouter.post("/minions", (req, res, next) => {
  const newMinion = db.addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

module.exports = apiRouter;
