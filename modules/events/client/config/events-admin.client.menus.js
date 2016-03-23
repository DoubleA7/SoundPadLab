'use strict';

// Configuring the events module
angular.module('events.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Events',
      state: 'admin.events'
    });
  }
]);
