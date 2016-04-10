'use strict';

//Dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Schema
var appointmentSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
  experiments: [ { type: Schema.Types.ObjectId, ref: 'Experiment' } ],
  //users: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
  created_at: Date,
  updated_at: Date,
  time: {
    type: Date,
    required: true
  },
  tags: [String],
  comments: String
});

//Set created/updated time on saves
appointmentSchema.pre('save', function (next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if (!this.created_at) {
    this.created_at = currentTime;
  }
  next();
});


var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
