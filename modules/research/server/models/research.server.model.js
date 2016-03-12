'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Research Schema
 */

var ResearchSchema = new Schema({
  
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
  title: String,
  content: String,
  image: String

});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
ResearchSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

var Research = mongoose.model('Research', ResearchSchema);
module.exports = Research;

