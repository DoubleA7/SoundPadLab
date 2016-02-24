'use strict';

// Configuring the Articles module
angular.module('appointments.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Appointments',
      state: 'admin.appointments'
    });
  }
]);

