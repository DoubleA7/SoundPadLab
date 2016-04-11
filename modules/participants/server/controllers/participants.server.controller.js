'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Experiment = mongoose.model('Experiment'),
  Appointment = mongoose.model('Appointment'),
  Participant = mongoose.model('Participant'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  
  
function addToExperiment(i, participant) {
  if(i<participant.experiments.length) {
    Experiment.findById(participant.experiments[i]).exec(function(err,experiment){
      if(experiment.participants.indexOf(participant._id) === -1){//If an experiment on the Database doesn't contain this participant add this participant ID to its participant list.
        experiment.participants.push(participant._id);
        experiment.save();
      }	  
      addToExperiment(i+1,participant);
    });
  } else {
    return;
  }
}

function removeFromExperiment(i, participant) {
  if(i<participant.experiments.length) {
    Experiment.findById(participant.experiments[i]).exec(function(err,experiment){
      if(experiment.participants.indexOf(participant._id) !== -1){//If an experiment on the Database does contain this participant remove this participant ID from its participant list.
        experiment.participants.splice(experiment.participants.indexOf(participant._id), 1);
        experiment.save();
      }	  
      removeFromExperiment(i+1,participant);
    });
  } else {
    return;
  }
}  
  
function addToAppointment(i, participant) {
  if(i<participant.appointments.length) {
    Appointment.findById(participant.appointments[i]).exec(function(err,appointment){
      if(appointment.participant !== participant._id){//If an appointment on the Database doesn't have this participant change the participant ID to this participant.
        appointment.participant = participant._id;
        appointment.save();
      }	  
      addToAppointment(i+1,participant);
    });
  } else {
    return;
  }
}

function removeFromAppointment(i, participant) {
  if(i <participant.appointments.length) {
    Appointment.findById(participant.appointments[i]).exec(function(err,appointment){
      if(appointment.participant === participant._id){//If an appointment on the Database has this participant change the participant ID to null;
        appointment.participant = null;
        appointment.save();
      }	  
      removeFromAppointment(i+1,participant);
    });
  } else {
    return;
  }
}

/**
 * Create a participant
 */
exports.create = function (req, res) {
  var participant = new Participant(req.body);
/*
  participant.name = req.body.name;
  participant.phone_number = req.body.phone_number;
  participant.email = req.body.email;
  participant.gender = req.body.gender; 
  participant.last_paid = req.body.last_paid;    
  //dob stored as dob.month, dob.day, dob.year
  participant.dob = req.body.dob;
  participant.vision_test = req.body.vision_test;
  participant.corrective_lenses = req.body.corrective_lenses;
  participant.contact_lenses = req.body.contact_lenses;
  participant.took_audiogram = req.body.took_audiogram;
  participant.HTRF_assigned = req.body.HTRF_assigned;
  participant.tags = req.body.tags;
  participant.gift_cards = participant.gift_cards;
  participant.experiments = req.body.experiments;
  participant.appointments = req.body.appointments;
  participant.comment = participant.comment;

  participant.save(function (err) {
    if (err) {
  	*/
  console.log(participant);
  participant.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      // for(var i in participant.appointments){
        // Appointment.findByIdAndUpdate(participant.appointments[i], { participant: participant._id }, { 'new': true});
      // }
      // for(var j in participant.experiments){
		// Experiment.findByIdAndUpdate(participant.experiments[j], { $push: { participants: participant._id }}, { 'new': true});
      // }
      addToAppointment(0, participant);
      addToExperiment(0, participant);
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
  participant.last_paid = req.body.last_paid;    
  //dob stored as dob.month, dob.day, dob.year
  participant.dob = req.body.dob;
  participant.vision_test = req.body.vision_test;
  participant.corrective_lenses = req.body.corrective_lenses;
  participant.contact_lenses = req.body.contact_lenses;
  participant.took_audiogram = req.body.took_audiogram;
  participant.HTRF_assigned = req.body.HTRF_assigned;
  participant.tags = req.body.tags;
  participant.gift_cards = participant.gift_cards;
  participant.experiments = req.body.experiments;
  participant.appointments = req.body.appointments;
  participant.comment = participant.comment;
    
  participant.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromAppointment(0, req.participant);
      removeFromExperiment(0, req.participant);
      addToAppointment(0, participant);
      addToExperiment(0, participant);

      // for(var i in req.participant.experiments){
        // if(participant.experiments.indexOf(req.participant.experiments[i]) === -1){//If an experiment has been removed, remove this participant ID from its participant list.
          // Experiment.findByIdAndUpdate(req.participant.experiments[i], { $pull: { participants: participant._id }});
        // }
      // }
      // for(var j in participant.experiments){
        // if(req.participant.experiments.indexOf(participant.experiments[j]) === -1){//If an experiment has been added, add this participant ID to its participant list.
          // Experiment.findByIdAndUpdate(participant.experiments[j], { $push: { participants: participant._id }}, { 'new': true});
        // }
      // }
      // for(var k in req.participant.appointments){
        // if(participant.appointments.indexOf(req.participant.appointments[k]) === -1){//If an appointment has been removed, remove this participant ID.
          // Appointment.findByIdAndUpdate(req.participant.appointments[k], { participant: null });
        // }
      // }
      // for(var l in participant.appointments){
        // if(req.participant.appointment.indexOf(participant.appointments[l]) === -1){//If an appointment has been added, add this participant ID.
          // Appointment.findByIdAndUpdate(participant.appointments[l], { participant: participant._id }, { 'new': true});
        // }
      // }
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
      removeFromAppointment(0, participant);
      removeFromExperiment(0, participant);
      // for(var i in req.participant.experiments){
        // Experiment.findByIdAndUpdate(req.participant.experiments[i], { $pull: { participants: participant._id }});
      // }
      // for(var j in req.participant.appointments){
        // Appointment.findByIdAndUpdate(req.participant.appointments[j], { $pull: { participants: participant._id }});
      // }
      res.json(participant);
    }
  });
};

/**
 * List of participants
 */
exports.list = function (req, res) {
  Participant.find().populate('experiments', 'display_name experiment_name experiment_conditions').sort('-created').exec(function (err, participants) {
    // Experiment.find().exec(function (err, experiments) {
      // if (err) {
        // console.log(err);
        // return res.status(400).send({
          // message: errorHandler.getErrorMessage(err)
        // });
      // } else {
        // res.json(experiments);
      // }
    // });
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

  Participant.findById(id).populate('experiments').exec(function (err, participant) {
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
