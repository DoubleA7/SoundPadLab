'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Participant Schema
 */

var AudioFileSchema = new Schema({
  
  created: {
    type: Date,
    default: Date.now
  },
  
  title: { type: String,required:true },
  filePath: { type: String, required:true }
    

});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
AudioFileSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  
  //var dob_str = new Date(Date.UTC(this.dob.year, , day, 0, 0, 0)); testing this.
  
  
  next();
});

var AudioFile = mongoose.model('AudioFile', AudioFileSchema);
module.exports = AudioFile;

