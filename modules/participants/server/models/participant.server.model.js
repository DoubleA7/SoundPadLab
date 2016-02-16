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
	
	_id : Schema.Types.ObjectId,
	
	created: {
		type: Date,
		default: Date.now
	},
	name: String,
	experiments: [Schema.Types.ObjectId],
    contact_info: {
        phone_number: Number,
        email: {  // add validator in this
            type: String,
            trim: true,
            unique: true,
            required: 'Email address required',
            
        },   
    },
    experiment: Schema.Types.ObjectId,
    appointment: Schema.Types.ObjectId,
    comment: String,
    contact_lenses: boolean,
    corrective_lenses: boolean,
    vision_test: boolean,
    tags: [String], //right now tagged by string
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Participant', ParticipantSchema);
