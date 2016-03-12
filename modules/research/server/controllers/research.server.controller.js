'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Research = require('../models/research.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a research
 */
exports.create = function (req, res) {
  var research = new Research(req.body);
    
  research.save(function (err) {
    if (err) {
      //console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(research);
    }
  });
};

/**
 * Show the current research
 */
exports.read = function (req, res) {
  res.json(req.research);
};

/**
 * Update a research
 */
 
exports.update = function (req, res) {
    
  var research = req.research;
  
  research.title = req.body.title;
  research.content = req.body.content;
  research.image = req.body.image;
    
  research.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(research);
    }
  });
};

/**
 * Delete a research
 */
exports.delete = function (req, res) {
  var research = req.research;

  research.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(research);
    }
  });
};

/**
 * List of research
 */
exports.list = function (req, res) {
  Research.find().sort('-created').exec(function (err, research) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(research);
    }
  });
};

/**
 * research middleware
 */
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
