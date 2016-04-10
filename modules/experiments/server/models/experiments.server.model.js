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
  participants: [ { type: Schema.Types.ObjectId, ref: 'Participant' } ],
  //users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  appointments: [ { type: Schema.Types.ObjectId, ref: 'Appointment' } ],
  tags: [String],
  requirements: [String],
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  requires_eyeglasses: {
    type: Boolean,
    required: true,
    default: false
  },
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
  if(!this.users){
    this.users = [];
  }
  if(!this.participants){
    this.participants = [];
  }
  if(!this.appointments){
    this.appointments = [];
  }
  next();
});
var Experiment = mongoose.model('Experiment', experimentSchema);
module.exports = Experiment;