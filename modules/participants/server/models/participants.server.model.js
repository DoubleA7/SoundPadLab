'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Participant Schema
 */

var ParticipantSchema = new Schema({
  
  created: {
    type: Date,
    default: Date.now
  },
  
  name: { type: String,
            required: true,
            unique: true
  },

  phone_number:{
    type: Number
  },
    
    //email is not being stored and then retrieved.+
  email: {  // add validator in this
    type: String,
    default: '',
    unique: true,
    required: 'Email must be specified!'
  },
    
  last_paid: Date,
    
  gender: String,
    
  dob: {
    day: Number,
    month: Number,
    year: Number
  },
    
  card_info: String,
    
  appointments: [Schema.Types.ObjectId],
  past_appointments: [Schema.Types.ObjectId],
  completed_experiments: [Schema.Types.ObjectId],
  assigned_experiments: [Schema.Types.ObjectId],
  comment: String,
    
  subject_id: Number,
  contact_lenses: Boolean,
  corrective_lenses: Boolean,
  vision_test: Boolean,
  took_audiogram: Boolean,
  HRTF_assigned: Boolean,
    
    
  tags: [String]
    

});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
ParticipantSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  
  //var dob_str = new Date(Date.UTC(this.dob.year, , day, 0, 0, 0)); testing this.
  
  
  next();
});

var Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;

