'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Participant = require('../models/participants.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a participant
 */
exports.create = function (req, res) {
  var participant = new Participant(req.body);
    
  participant.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(participant);
    }
  });
};

/**
 * Show the current participant
 */
exports.read = function (req, res) {
  res.json(req.participant);
};

/**
 * Update a participant
 */
 
exports.update = function (req, res) {
    
  var participant = req.participant;
    
  participant.name = req.body.name;
  participant.phone_number = req.body.phone_number;
  participant.email = req.body.email;
  participant.gender = req.body.gender;
    
    
    //dob stored as dob.month, dob.day, dob.year
  participant.dob = req.body.dob;
    
  participant.card_info = req.body.card_info;
    
  participant.vision_test = req.body.vision_test;
  participant.corrective_lenses = req.body.corrective_lenses;
  participant.contact_lenses = req.body.contact_lenses;
  participant.took_audiogram = req.body.took_audiogram;
  participant.HTRF_assigned = req.body.HTRF_assigned;
    
  participant.completed_experiments = req.body.completed_experiments;
  participant.assigned_experiments = req.body.assigned_experiments;
  participant.past_appointments = req.body.past_appointments;
  participant.appointments = req.body.appointments;
  participant.comment = participant.comment;
    
  participant.last_paid = req.body.last_paid;
  participant.tags = req.body.tags; 
    
    //subject_id not being updated 
    
  participant.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(participant);
    }
  });
};

/**
 * Delete an participant
 */
exports.delete = function (req, res) {
  var participant = req.participant;

  participant.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(participant);
    }
  });
};

/**
 * List of participants
 */
exports.list = function (req, res) {
  Participant.find().sort('-created').exec(function (err, participants) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(participants);
    }
  });
};

/**
 * participant middleware
 */
exports.participantByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'participant is invalid'
    });
  }

    //participant.findById(id).populate('name', 'displayName').exec(function (err, participant) {
  Participant.findById(id).exec(function (err, participant) {
    if (err) {
      return next(err);
    } else if (!participant) {
      return res.status(404).send({
        message: 'No participant with that identifier has been found'
      });
    }
    req.participant = participant;
    next();
  });
};
