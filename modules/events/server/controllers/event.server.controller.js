'use strict';

//Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Create
exports.create = function (req, res) {
  var event = new Event(req.body);

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(event);
    }
  });
};

//Read
exports.read = function (req, res) {
  res.json(req.event);
};

//Update
exports.update = function (req, res) {
  var event = req.event;

  event.title = req.body.title;
  event.image = req.body.image;
  event.description = req.body.description;

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(event);
    }
  });
};

//Delete
exports.delete = function (req, res) {
  var event = req.event;

  event.remove(function (err) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

//List All
exports.list = function (req, res) {
  Event.find().sort('time').exec(function (err, event) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.json(event);
    }
  });
};

//Middleware
exports.eventByID = function (req, res, next, id) {
  Event.findById(id).exec(function (err, event) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      req.event = event;
      next();
    }
  });
};