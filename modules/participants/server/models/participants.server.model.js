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
        unique: true,
        required: true
    },

	past_experiments: [Schema.Types.ObjectId],
	past_appointments: [Schema.Types.ObjectId],
    experiments: [Schema.Types.ObjectId],
    appointment: Schema.Types.ObjectId,
    comment: String,
    contact_lenses: Boolean,
    corrective_lenses: Boolean,
    vision_test: Boolean,
    tags: [String], //right now tagged by string, this may be more complicated than i thought
	// user: {                              //no relationships yet!!
		// type: Schema.ObjectId,
		// ref: 'User'
	// }
});

var Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;


//for tagging implementaion
//keep a tags table
//map objectid to tag
//re askher if she really wants this or what?

