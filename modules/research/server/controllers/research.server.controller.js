'use strict';

//Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  Research = require('../models/research.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Create
exports.create = function (req, res) {
    var research = new Research(req.body);
    console.log(research);
    research.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
        res.json(research);
    }
  });
};

//Read
exports.read = function (req, res) {
    res.json(req.research);
};

//Update
exports.update = function (req, res) {
    var research = req.research;

    research.title = req.body.title;
    research.image = req.body.image;
    research.content = req.body.content;

    research.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
        res.json(research);
    }
  });
};

//Delete
exports.delete = function (req, res) {
    var research = req.research;

    research.remove(function (err) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    }
    else {
        res.json(research);
    }
  });
};

//List All
exports.list = function (req, res) {
    Research.find().sort('-created_at').exec(function (err, research) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
        res.json(research);
    }
  });
};

//Middleware
exports.researchByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'research is invalid'
        });
    }

    Research.findById(id).exec(function (err, research) {
        if (err) {
            return next(err);
        } else if (!research) {
            return res.status(404).send({
                message: 'No research with that identifier has been found'
            });
        }
        req.research = research;
        next();
    });
};