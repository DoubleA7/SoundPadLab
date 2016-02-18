'use strict';

var appointments = require('../controllers/appointment.server.controller');

module.exports = function (app) {
  app.route('/api/appointments')
    .get(appointments.list)
    .post(appointments.create);

  app.route('/api/appointments/:appointmentId')
    .get(appointments.read)
    .put(appointments.update)
    .delete(appointments.delete);

  app.param('appointmentId', appointments.appointmentByID);
};