const express = require("express");
const minionsRouter = express.Router();
const db = require("./db");

minionsRouter.get("/", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  if (minions) {
    res.send(minions);
  } else {
    res.send([]);
  }
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = db.addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.use("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  if (isNaN(minionId)) {
    res.status(404).send("non-numeric ID");
  } else {
    const minion = db.getFromDatabaseById("minions", minionId);
    if (minion !== undefined) {
      req.minionId = minionId;
      req.minion = minion;
      next();
    } else {
      res.status(404).send("Minion not found");
    }
  }
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = req.body;
  updatedMinion.id = req.minionId;

  const updatedMinionResponse = db.updateInstanceInDatabase(
    "minions",
    updatedMinion
  );
  res.send(updatedMinionResponse);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const isMinionDeleted = db.deleteFromDatabasebyId("minions", req.minionId);

  res.status(204).send(isMinionDeleted);
});

module.exports = minionsRouter;
