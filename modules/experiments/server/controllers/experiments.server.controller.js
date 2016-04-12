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
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  
function addToParticipant(i, experiment) {
  if(i<experiment.participants.length) {
    Participant.findById(experiment.participants[i]).exec(function(err,participant){
      if(participant.experiments.indexOf(experiment._id) === -1){//If a participant on the Database doesn't contain this experiment add this experiment ID to his/her experiment list.
        participant.experiments.push(experiment._id);
        participant.save();
      }	  
      addToParticipant(i+1,experiment);
    });
  } else {
    return;
  }
}

function removeFromParticipant(i, experiment) {
  if(i<experiment.participants.length) {
    Participant.findById(experiment.participants[i]).exec(function(err,participant){
      if(participant.experiments.indexOf(experiment._id) !== -1){//If a participant on the Database does contain this experiment remove this experiment ID to his/her experiment list.
        participant.experiments.splice(participant.experiments.indexOf(experiment._id), 1);
        participant.save();
      }	  
      removeFromParticipant(i+1,experiment);
    });
  } else {
    return;
  }
}

function addToAppointment(i, experiment) {
  if(i<experiment.appointments.length) {
    Appointment.findById(experiment.appointments[i]).exec(function(err,appointment){
      if(appointment.experiments.indexOf(experiment._id) === -1){//If an appointment on the Database doesn't contain this experiment add this experiment ID to its experiment list.
        appointment.experiments.push(experiment._id);
        appointment.save();
      }	  
      addToAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

function removeFromAppointment(i, experiment) {
  if(i<experiment.appointments.length) {
    Appointment.findById(experiment.appointments[i]).exec(function(err,appointment){
      if(appointment.experiments.indexOf(experiment._id) !== -1){//If an appointment on the Database does contain this experiment remove this experiment ID to its experiment list.
        appointment.experiments.splice(appointment.experiments.indexOf(experiment._id), 1);
        appointment.save();
      }	  
      removeFromAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

function addToUser(i, experiment) {
  console.log('In add to user');
  if(i<experiment.users.length) {
    console.log('Trying to find user');
    User.findById(experiment.users[i]).exec(function(err,user){
      if(user.experiments.indexOf(experiment._id) === -1){//If a user on the Database doesn't contain this experiment add this experiment ID to his/her experiment list.
        user.experiments.push(experiment._id);
        console.log(user);
        console.log('Trying to add to user');
        console.log(user);
        user.save();
      }	  
      addToUser(i+1,experiment);
    });
  } else {
    return;
  }
}

function removeFromUser(i, experiment) {
  if(i<experiment.users.length) {
    User.findById(experiment.users[i]).exec(function(err,user){
      if(user.experiments.indexOf(experiment._id) !== -1){//If a user on the Database does contain this experiment remove this experiment ID to his/her experiment list.
        user.experiments.splice(user.experiments.indexOf(experiment._id), 1);
        user.save();
      }	  
      removeFromAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

//
/**
 * Create a experiment
 */
exports.create = function (req, res) {
  console.log(req.body);
  var experiment = new Experiment(req.body);

  /*
  experiment.participants = req.body.participants;
  experiment.users = req.body.users;
  experiment.appointments = req.body.appointments;
  experiment.tags = req.body.tags;
  experiment.requirements = req.body.requirements;
  experiment.completed = req.body.completed;
  experiment.requires_eyeglasses = req.body.requires_eyeglasses;
  experiment.experiment_name = req.body.experiment_name;
  experiment.save(function (err) {
    if (err) {
  	*/
  console.log(experiment);
  console.log(experiment.users);
  console.log(experiment.users.length);
    var temp0 = [];
    /*for(var j = 0; j < experiment.users.length; j++){
      if(typeof experiment.users[j]=== 'string')
        temp0.push(mongoose.mongo.ObjectId(experiment.users[j]));
    }
    console.log(temp0);
    experiment.users = temp0;*/
      
  experiment.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      console.log('Made it inside save\n');
      console.log(experiment);
      //for(var i=0;i < experiment.participants.length;i++){
        //console.log('\nID: ' + experiment._id);
		//console.log('\nexperients.participants: ' + experiment.participants);
        //Participant.findById(experiment.participants[i], addToParticipant(participant, experiment._id));
        //Participant.findById(experiment.participants[0]).exec(function (err, participant) {
          //console.log('\nParticipant: \n' + participant);
          //participant.experiments.push(experiment._id);
          //participant.save();
        //});
        // Participant.findById({"_id": "56f09dbc9c7c29e00eddca2c"}).exec(function (err, participant) {
          // console.log('\nParticipant: \n' + participant);
        // });
		//Participant.findByIdAndUpdate({"_id": "56f09dbc9c7c29e00eddca2c"}, { $push: { experiments: experiment._id }}, { 'new': true});
        //console.log(experiment.participants);
        //console.log(Participant.find());
		//console.log(experiment.participants[0]);
        //Participant.findById(experiment.participants[i]).exec(function(participant) {
	      //console.log(participant);
          //participant.experiments.push(experiment._id);
          //participant.save();
        //});
      //}
      //for(var j in experiment.appointments){
		//Appointment.findByIdAndUpdate(experiment.appointments[j], { $push: { experiments: experiment._id }}, { 'new': true});
     // }
      // for(var k in experiment.users){
		// User.findByIdAndUpdate(experiment.users[i], { $push: { experiments: experiment._id }}, { 'new': true});
      // }
      addToParticipant(0, experiment);
      addToAppointment(0, experiment);
      addToUser(0, experiment);
      console.log('Made it past addtoUser\n');
      console.log(experiment);
      res.json(experiment);
    }
  });
};


/**
 * Show the current experiment
 */
exports.read = function (req, res) {
  //console.log(res);
  res.json(req.experiment);
};

/**
 * Update a experiment
 */
exports.update = function (req, res) {
  var experiment = req.experiment;

  experiment.participants = req.body.participants;
  experiment.users = req.body.users;
  experiment.appointments = req.body.appointments;
  experiment.tags = req.body.tags;
  experiment.requirements = req.body.requirements;
  experiment.completed = req.body.completed;
  experiment.requires_eyeglasses = req.body.requires_eyeglasses;
  experiment.experiment_name = req.body.experiment_name;
  experiment.experiment_conditions = req.body.experiment_conditions;

  experiment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromAppointment(0, req.experiment);
      removeFromParticipant(0, req.experiment);
      removeFromUser(0, req.experiment);
      addToAppointment(0, experiment);
      addToParticipant(0, experiment);
      addToUser(0, experiment);
      /*for(var i in req.experiment.participants){
        if(experiment.participants.indexOf(req.experiment.participants[i]) === -1){//If a participants has been removed, remove this experiment ID from his/her experiment list.
          //Participant.findByIdAndUpdate(req.experiment.participants[i], { $pull: { experiments: experiment._id }});
        }
      }
      for(var j in experiment.participants){
        if(req.experiment.participants.indexOf(experiment.participants[j]) === -1){//If a participant has been added, add this experiment ID to his/her experiment list.
          //Participant.findByIdAndUpdate(req.experiment.participants[j], { $push: { experiments: experiment._id }}, { 'new': true});
        }
      }
      // for(var k in req.experiment.users){
        // if(experiment.users.indexOf(req.experiment.users[k]) === -1){//If a user has been removed, remove this experiment ID from his/her experiment list.
          // User.findByIdAndUpdate(req.experiment.users[k], { $pull: { experiments: experiment._id }});
        // }
      // }
      // for(var l in experiment.users){
        // if(req.experiment.users.indexOf(experiment.users[l]) === -1){//If a user has been added, add this experiment ID to his/her experiment list.
          // User.findByIdAndUpdate(req.experiment.users[l], { $push: { experiments: experiment._id }}, { 'new': true});
        // }
      // }
      for(var m in req.experiment.appointments){
        if(experiment.appointments.indexOf(req.experiment.appointments[m]) === -1){//If an appointment has been removed, remove this experiment ID from its experiment list.
          Appointment.findByIdAndUpdate(req.experiment.appointments[m], { $pull: { experiments: experiment._id }});
        }
      }
      for(var n in experiment.appointments){
        if(req.experiment.appointments.indexOf(experiment.appointments[n]) === -1){//If an appointment has been added, add this experiment ID to his/her experiment list.
          Appointment.findByIdAndUpdate(req.experiment.appointment[n], { $push: { experiments: experiment._id }}, { 'new': true});
        }
      }*/
      res.json(experiment);
    }
  });
};

/**
 * Delete an experiment
 */
exports.delete = function (req, res) {
  var experiment = req.experiment;

  experiment.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromAppointment(0, experiment);
      removeFromParticipant(0, experiment);
      //removeFromUser(0, experiment);
      /*for(var i in experiment.participants){
        //Participant.findByIdAndUpdate(experiment.participants[i], { $pull: { experiments: experiment._id }});
        // Participant.findById({"_id": "56f09dbc9c7c29e00eddca2c"}).exec(function (err, participant) {
          //console.log('\nParticipant: \n' + participant);
          // participant.experiments.splice(participant.experiments.indexOf(experiment._id), 1);
          // participant.save();
        // });
        removeFromParticipant(experiment.participants[i], experiment._id);
      }
      // for(var j in experiment.users){
        // User.findByIdAndUpdate(experiment.users[j], { $pull: { experiments: experiment._id }});
      // }
      for(var k in experiment.appointments){
        //Appointment.findByIdAndUpdate(experiment.appointments[k], { $pull: { experiments: experiment._id }});
        removeFromParticipant(experiment.appointments[k], experiment._id);
      }*/
      res.json(experiment);
    }
  });
};

/**
 * List of experiments
 */
exports.list = function (req, res) {
  Experiment.find().populate('participants', 'name email phone_number conditions').sort('experiment_name').exec(function (err, experiments) {  
  // Participant.findById({
        // "_id": "56f09dbc9c7c29e00eddca2c"
    // }).exec(function (err, participant) {
      // if (err) {
        // console.log(err);
        // return res.status(400).send({
          // message: errorHandler.getErrorMessage(err)
        // });
      // } else {
        // res.json(participant);
      // }
    // });
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experiments);
    }
  });
};

/**
 * experiment middleware
 */
exports.experimentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'experiment is invalid'
    });
  }

   // experiment.findById(id).populate('name', 'displayName').exec(function (err, experiment) {
  Experiment.findById(id).populate('participants', 'name email phone_number conditions').populate('appointments').populate({ path: 'appointments', populate: { path: 'participant' } }).exec(function (err, experiment) {
    if (err) {
      return next(err);
    } else if (!experiment) {
      return res.status(404).send({
        message: 'No experiment with that identifier has been found'
      });
    }
    req.experiment = experiment;
    next();
  });
};
