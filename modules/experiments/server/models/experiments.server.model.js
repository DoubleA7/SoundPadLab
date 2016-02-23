'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Experiment Schema
 */
 
var experimentSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  participants: [Schema.Types.ObjectId],
  users: [Schema.Types.ObjectId],
  requirements: [String],
  requires_eyeglasses: {
    type: Boolean,
    required: true,
    default: false
  },
  appointments: [Schema.Types.ObjectId],
  tags: [String],
  experiment_name: {
    type: String,
    unique: true,
    required: true
  },
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
experimentSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at){
    this.created_at = currentTime;
  }
  next();
});
var Experiment = mongoose.model('Experiment', experimentSchema);
module.exports = Experiment;