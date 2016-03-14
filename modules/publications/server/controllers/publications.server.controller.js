'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Publication = require('../models/publications.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a publication
 */
exports.create = function (req, res) {
  var publication = new Publication(req.body);
    
  publication.save(function (err) {
    if (err) {
      //console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * Show the current publication
 */
exports.read = function (req, res) {
  res.json(req.publication);
};

/**
 * Update a publication
 */
 
exports.update = function (req, res) {
    
  var publication = req.publication;
    
  publication.name = req.body.name;
  publication.phone_number = req.body.phone_number;
  publication.email = req.body.email;
  publication.gender = req.body.gender;
    
    
    //dob stored as dob.month, dob.day, dob.year
  publication.dob = req.body.dob;
    
  publication.card_info = req.body.card_info;
    
  publication.vision_test = req.body.vision_test;
  publication.corrective_lenses = req.body.corrective_lenses;
  publication.contact_lenses = req.body.contact_lenses;
  publication.took_audiogram = req.body.took_audiogram;
  publication.HTRF_assigned = req.body.HTRF_assigned;
    
  publication.completed_experiments = req.body.completed_experiments;
  publication.assigned_experiments = req.body.assigned_experiments;
  publication.past_appointments = req.body.past_appointments;
  publication.appointments = req.body.appointments;
  publication.comment = publication.comment;
    
  publication.last_paid = req.body.last_paid;
  publication.tags = req.body.tags; 
    
    //subject_id not being updated 
    
  publication.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * Delete an publication
 */
exports.delete = function (req, res) {
  var publication = req.publication;

  publication.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * List of publications
 */
exports.list = function (req, res) {
  Publication.find().sort('-created').exec(function (err, publications) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publications);
    }
  });
};

/**
 * publication middleware
 */
exports.publicationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'publication is invalid'
    });
  }

    //publication.findById(id).populate('name', 'displayName').exec(function (err, publication) {
  Publication.findById(id).exec(function (err, publication) {
    if (err) {
      return next(err);
    } else if (!publication) {
      return res.status(404).send({
        message: 'No publication with that identifier has been found'
      });
    }
    req.publication = publication;
    next();
  });
};
