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

var gName = null;

/**
 * Create an audio file
 */
exports.create = function (req, res) {
  var audiofile = new AudioFile(req.body);
  console.log('Gname :' +gName);
  if(gName !== null){
    audiofile.filePath = gName;
    console.log('file name');
  }
  audiofile.save(function (err) {
    if (err) {
      //console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } 
    else {
      gName = null;
      res.json(audiofile);
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
  var upload = multer(config.uploads.mp3Upload).single('mp3File');
  var mp3UploadFilter = require(path.resolve('./config/lib/multer')).mp3UploadFilter;
  /*var audiofile = new AudioFile(req.body);
  upload.fileFilter = mp3UploadFilter;
  //console.log(req.body);
  audiofile.title = req.title;*/
  upload(req, res, function (uploadError) {
    //console.log(req);
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading mp3'
      });
    } 
    else {
      gName = config.uploads.mp3Upload.dest + req.file.filename;
      res.send(gName);
      //gName = req.bod.filePath;
    }
  });
};

exports.getMp3 = function (req,res){
  var filePath;
  if(req === null)
    res.send('null request');
  else{
    filePath = req.body.filePath;
    console.log(filePath);
  }
  //res.send('test');
  fs.readFile(filePath,'base64', function (err, data) {
    if (err) {
      res.send('error while reading');
      console.error(err);
    }
    //console.log("Asynchronous read: " + data);
    var d = "data:audio/mp3;base64," + data;
    res.send(d);
  });


};
