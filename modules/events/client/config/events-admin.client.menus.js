'use strict';

// Configuring the events module
angular.module('events.admin').run(['Menus',
  function (Menus) {
      Menus.addSubMenuItem('topbar', 'admin', {
          title: 'Manage Events',
          state: 'admin.events'
      });
  }
]);
