'use strict';

//Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  Experiment = mongoose.model('Experiment'),
  Appointment = mongoose.model('Appointment'),
  Participant = mongoose.model('Participant'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  
function addToExperiment(i, appointment) {
  if(i<appointment.experiments.length) {
    Experiment.findById(appointment.experiments[i]).exec(function(err,experiment){
      if(experiment.appointments.indexOf(appointment._id) === -1){//If an experiment on the Database doesn't contain this appointment add this appointment ID to its appointment list.
        experiment.appointments.push(appointment._id);
        experiment.save();
      }	  
      addToExperiment(i+1,appointment);
    });
  } else {
    return;
  }
}

function removeFromExperiment(i, appointment) {
  if(i<appointment.experiments.length) {
    Experiment.findById(appointment.experiments[i]).exec(function(err,experiment){
      if(experiment.appointments.indexOf(appointment._id) !== -1){//If an experiment on the Database does contain this appointment remove this appointment ID from its appointment list.
        experiment.appointments.splice(experiment.appointments.indexOf(appointment._id), 1);
        experiment.save();
      }	  
      removeFromExperiment(i+1,appointment);
    });
  } else {
    return;
  }
}

function addToUser(i, appointment) {
  if(i<appointment.users.length) {
    User.findById(appointment.users[i]).exec(function(err,user){
      if(user.appointments.indexOf(appointment._id) === -1){//If a user on the Database doesn't contain this appointment add this appointment his/her to its appointment list.
        user.appointments.push(appointment._id);
        user.save();
      }	  
      addToUser(i+1,appointment);
    });
  } else {
    return;
  }
}

function removeFromUser(i, appointment) {
  if(i<appointment.users.length) {
    User.findById(appointment.users[i]).exec(function(err,user){
      if(user.appointments.indexOf(appointment._id) !== -1){//If a user on the Database does contain this appointment remove this appointment ID from his/her appointment list.
        user.appointments.splice(user.appointments.indexOf(appointment._id), 1);
        user.save();
      }	  
      removeFromUser(i+1,appointment);
    });
  } else {
    return;
  }
}


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
      addToExperiment(0, appointment);
      addToUser(0, appointment);
      Participant.findById(appointment.participant).exec(function(err,participant){
        if(participant.appointments.indexOf(appointment._id) === -1){//If a participant on the Database doesn't contain this appointment add this appointment his/her to its appointment list.
          participant.appointments.push(appointment._id);
          participant.save();
        }	  
      });
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
  appointment.tags = req.body.tags;
  appointment.comments = req.body.comments;
  appointment.users = req.body.users;

  appointment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromExperiment(0, req.appointment);
      addToExperiment(0, appointment);
      removeFromUser(0, req.appointment);
      addToUser(0, appointment);
      Participant.findById(req.appointment.participant).exec(function(err,participant){
        if(participant.appointments.indexOf(req.appointment._id) !== -1){//If a participant on the Database does contain this appointment remove this appointment his/her from its appointment list.
          participant.appointments.splice(participant.appointments.indexOf(req.appointment._id), 1);
          participant.save();
        }	  
      });
      Participant.findById(appointment.participant).exec(function(err,participant){
        if(participant.appointments.indexOf(appointment._id) === -1){//If a participant on the Database doesn't contain this appointment add this appointment his/her to its appointment list.
          participant.appointments.push(appointment._id);
          participant.save();
        }	  
      });
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
      removeFromExperiment(0, appointment);
      removeFromUser(0, appointment);
      Participant.findById(appointment.participant).exec(function(err,participant){
        if(participant.appointments.indexOf(appointment._id) !== -1){//If a participant on the Database does contain this appointment remove this appointment his/her from its appointment list.
          participant.appointments.splice(participant.appointments.indexOf(appointment._id), 1);
          participant.save();
        }	  
      });
      res.end();
    }
  });
};

//List All
exports.list = function (req, res) {
  Appointment.find().populate('participant').sort('time').exec(function (err, appointment) {
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
  Appointment.findById(id).populate('participant').populate('experiments').exec(function (err, appointment) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      req.appointment = appointment;
      next();
    }
  });
};