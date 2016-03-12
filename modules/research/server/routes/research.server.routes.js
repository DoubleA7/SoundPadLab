'use strict';

/**
 * Module dependencies.
 */
var research = require('../controllers/research.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
    // research collection routes
  app.route('/api/research')
        .get(adminPolicy.isAllowed,research.list)
        .post(adminPolicy.isAllowed,research.create);

    // Single research routes
  app.route('/api/research/:researchId')
        .get(adminPolicy.isAllowed,research.read)
        .put(adminPolicy.isAllowed,research.update)
        .delete(adminPolicy.isAllowed,research.delete);

    // Finish by binding the research middleware
  app.param('researchId', research.researchByID);
};
