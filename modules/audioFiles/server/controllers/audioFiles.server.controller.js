'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  AudioFile = require('../models/audioFiles.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a participant
 */
exports.create = function (req, res) {
  var audiofile = new AudioFile(req.body);
    
  audiofile.save(function (err) {
    if (err) {
      //console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audiofile);
    }
  });
};

/**
 * Show the current audiofile
 */
exports.read = function (req, res) {
  res.json(req.audiofile);
};

/**
 * Update a audiofile
 */
 
exports.update = function (req, res) {
    
  var audiofile = req.audiofile;
    
  audiofile.name = req.body.name;
  audiofile.download_link = req.body.download_link;
  
    
    //subject_id not being updated 
    
  audiofile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audiofile);
    }
  });
};

/**
 * Delete an audiofile
 */
exports.delete = function (req, res) {
  var audiofile = req.audiofile;

  audiofile.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audiofile);
    }
  });
};

/**
 * List of audioFiles
 */
exports.list = function (req, res) {
  AudioFile.find().sort('-created').exec(function (err, audioFiles) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audioFiles);
    }
  });
};

/**
 * audiofile middleware
 */
exports.audioFileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'audiofile is invalid'
    });
  }

    //audiofile.findById(id).populate('name', 'displayName').exec(function (err, audiofile) {
  AudioFile.findById(id).exec(function (err, audiofile) {
    if (err) {
      return next(err);
    } else if (!audiofile) {
      return res.status(404).send({
        message: 'No audiofile with that identifier has been found'
      });
    }
    req.audiofile = audiofile;
    next();
  });
};
