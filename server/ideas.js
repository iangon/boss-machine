const express = require("express");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");
const db = require("./db");

ideasRouter.get("/", (req, res, next) => {
  const ideas = db.getAllFromDatabase("ideas");

  if (ideas) {
    res.send(ideas);
  } else {
    res.send([]);
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.use("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  if (isNaN(ideaId)) {
    res.status(404).send("Invalid ID");
  } else {
    const idea = db.getFromDatabaseById("ideas", ideaId);
    if (idea !== undefined) {
      req.idea = idea;
      req.ideaId = ideaId;
      next();
    } else {
      res.status(404).send("Idea not found");
    }
  }
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const ideaUpdate = req.body;
  ideaUpdate.id = req.ideaId;

  const idea = db.updateInstanceInDatabase("ideas", ideaUpdate);
  console.log(idea);

  if (idea) {
    res.send(idea);
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const isDeleted = db.deleteFromDatabasebyId("ideas", req.ideaId);
  console.log(isDeleted);
  if (isDeleted) {
    res.status(204).send();
  }
});

module.exports = ideasRouter;
