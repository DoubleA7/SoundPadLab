'use strict';

// Configuring the Articles module
angular.module('publications.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Publications',
      state: 'admin.publications'
    });
  }
]);

