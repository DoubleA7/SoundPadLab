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
    
    //the fields
    // grab the request json body fields from req.body
   
    participant.name = req.body.name;
    participant.contact_info = {
        phone_number : req.body.phone_number,
        email : req.body.email
    };
    // participant.contact_info.phone_number = req.body.contact_info.phone_number;
    // participant.contact_info.email = req.body.contact_info.email;
    participant.contact_lenses = req.body.contact_lenses;
    participant.corrective_lenses = req.body.corrective_lenses;
    participant.vision_test = req.body.vision_test;
   // participant.tags = req.body.tags; //must be sent as a list of String tags when creating? //check this
   //add tags in update operation (when we tag the participant, thats when we update the participant)
    
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
    participant.contact_info = {
        phone_number : req.body.phone_number,
        email : req.body.email
    };
    // participant.contact_info.phone_number = req.body.contact_info.phone_number;
    // participant.contact_info.email = req.body.contact_info.email;
    participant.contact_lenses = req.body.contact_lenses;
    participant.corrective_lenses = req.body.corrective_lenses;
    participant.vision_test = req.body.vision_test;
    participant.tags = req.body.tags; //must be sent as a list of String tags when creating? //check this
   //add tags in update operation (when we tag the participant, thats when we update the participant)
    

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
