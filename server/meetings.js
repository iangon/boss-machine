const express = require("express");
const meetingsRouter = express.Router();
const db = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  const meetings = db.getAllFromDatabase("meetings");
  if (meetings) {
    res.send(meetings);
  } else {
    res.send([]);
  }
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = db.addToDatabase("meetings", req.body);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  const meetings = db.deleteAllFromDatabase("meetings");
  res.status(204).send(meetings);
});

module.exports = meetingsRouter;
