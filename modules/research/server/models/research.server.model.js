'use strict';

//Dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Schema
var researchSchema = new Schema({
  image: String,
  content: String,
  title: String,
  created_at: Date,
  updated_at: Date
});

//Set created/updated time on saves
researchSchema.pre('save', function (next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if (!this.created_at) {
    this.created_at = currentTime;
  }
  next();
});


var Research = mongoose.model('Research', researchSchema);

module.exports = Research;
