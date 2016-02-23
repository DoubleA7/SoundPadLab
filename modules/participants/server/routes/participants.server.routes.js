'use strict';

/**
 * Module dependencies.
 */
var    participants = require('../controllers/participants.server.controller');
//var participantsPolicy = require('../policies/participants.server.policy'),

module.exports = function (app) {
    // participants collection routes
    app.route('/api/participants')
        .get(participants.list)
        .post(participants.create);

    // Single participant routes
    app.route('/api/participants/:participantId')
        .get(participants.read)
        .put(participants.update)
        .delete(participants.delete);

    // Finish by binding the participant middleware
    app.param('participantId', participants.participantByID);
};
