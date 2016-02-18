'use strict';

//Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  Appointment = mongoose.model('Appointment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Create
exports.create = function (req, res) {
  var appointment = new Appointment(req.body);

  appointment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(appointment);
    }
  });
};

//Read
exports.read = function (req, res) {
  res.json(req.appointment);
};

//Update
exports.update = function (req, res) {
  var appointment = req.appointment;

  appointment.participant = req.body.participant;
  appointment.experiments = req.body.experiments;
  appointment.time = req.body.time;
  appointment.comments = req.body.comments;

  appointment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(appointment);
    }
  });
};

//Delete
exports.delete = function (req, res) {
  var appointment = req.appointment;

  appointment.remove(function (err) {
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
  Appointment.find().sort('time').exec(function (err, appointment) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.json(appointment);
    }
  });
};

//Middleware
exports.appointmentByID = function (req, res, next, id) {
  Appointment.findById(id).exec(function (err, appointment) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      req.appointment = appointment;
      next();
    }
  });
};