'use strict';

var events = require('../controllers/event.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
  app.route('/api/events')
    .get(/*adminPolicy.isAllowed,*/events.list)
    .post(adminPolicy.isAllowed,events.create);

  app.route('/api/events/:eventId')
    .get(/*adminPolicy.isAllowed,*/events.read)
    .put(adminPolicy.isAllowed,events.update)
    .delete(adminPolicy.isAllowed,events.delete);

  app.param('eventId', events.eventByID);
};
