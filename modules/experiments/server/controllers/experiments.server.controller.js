'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Experiment = require('../models/experiments.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a experiment
 */
exports.create = function (req, res) {
    var experiment = new Experiment(req.body);
        
    experiment.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
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
    experiment.requirements = req.body.requirements;
    experiment.requires_eyeglasses = req.body.requires_eyeglasses;
    experiment.appointments = req.body.appointments;
    experiment.tags = req.body.tags;
    experiment.experiment_name = req.body.experiment_name;

    experiment.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
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
        } else {
            res.json(experiment);
        }
    });
};

/**
 * List of experiments
 */
exports.list = function (req, res) {
    Experiment.find().sort('experiment_name').exec(function (err, experiments) {
        
        if (err) {
            console.log(err);
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

// Experiment.findById(id).exec(function (err, experiment){
	// if(err){
		// res.status(400).send(err);
	// }
	// else{
		// req.experiment = experiment;
		// next();
	// }
// });
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'experiment is invalid'
        });
    }

   // experiment.findById(id).populate('name', 'displayName').exec(function (err, experiment) {
    Experiment.findById(id).exec(function (err, experiment) {
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
