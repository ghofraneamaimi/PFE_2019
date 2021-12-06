const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Client } = require("../models/client");

// => localhost:3000/clients/
router.get("/", (req, res) => {
  Client.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Clients :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Client.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Client :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var emp = new Client({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
	phone: req.body.phone,
	email: req.body.email,
	//role: req.body.role
  });
  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Client Save :" + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var emp = {
    name: req.body.name,
    username: req.body.username,
     password: req.body.password,
	phone: req.body.phone,
	email: req.body.email,
  };
  Client.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Client Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Client.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Client Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
