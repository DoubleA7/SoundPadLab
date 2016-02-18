'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Experiment Schema
 */
 
var ExperimentSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    
    participants: [Schema.Types.ObjectId],
    users: [Schema.Types.ObjectId],
    requirements: [String],
    requires_eyeglasses: {
        type: boolean,
        required: true,
        default: false
    },
    appointments: [Schema.Types.ObjectId],
    tags: [String],
    experiment_namename: {
        type: String,
        unique: true,
        required: true
    },
});

var Experiment = mongoose.model('Experiment', ExperimentSchema);
module.exports = Experiment;