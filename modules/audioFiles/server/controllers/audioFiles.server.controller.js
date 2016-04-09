'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  AudioFile = require('../models/audioFiles.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var _ = require('lodash'),
  fs = require('fs'),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));
/**
 * Create an audio file
 */
exports.create = function (req, res) {
  var upload = multer(config.uploads.mp3Upload).single('mp3File');
  var mp3UploadFilter = require(path.resolve('./config/lib/multer')).mp3UploadFilter;
  var audiofile = new AudioFile(req.body);
  upload.fileFilter = mp3UploadFilter;
  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading mp3'
      });
    } 
    else {
      audiofile.filePath = config.uploads.mp3Upload.dest + req.file.filename;
      audiofile.title = 'testTitle';
      audiofile.save(function (err) {
        if (err) {
          //console.log(err);
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } 
        else {
          res.json(audiofile);
        }
      });
    }
  });
};

//audiofile.filePath = config.uploads.mp3Upload.dest + req.file.filename;
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
    
  audiofile.title= req.body.title;
  audiofile.filePath = req.body.filePath;
  
    
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

exports.uploadMp3File = function (req, res) {
  //var credentials = req.credentials;
  var message = null;
  var upload = multer(config.uploads.mp3Upload).single('mp3File');
  var mp3UploadFilter = require(path.resolve('./config/lib/multer')).mp3UploadFilter;
  var user = req.user;
  console.log(JSON.stringify(req.body));
  // Filtering to upload only images
  upload.fileFilter = mp3UploadFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading mp3'
        });
      } else {
        //credentials.filePath = config.uploads.mp3Upload.dest + req.file.filename;
        console.log(config.uploads.mp3Upload.dest + req.file.filename);
        //alert('saved credentials');
       /* var audiofile = new AudioFile(req.body);

        audiofile.save(function (err) {
         if (err) {
        //console.log(err);
        return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
        });
      } else {
      res.json(audiofile);
      }
    });*/
        /*user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });*/
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
