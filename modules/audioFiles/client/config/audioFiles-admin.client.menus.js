'use strict';

// Configuring the Articles module
angular.module('audioFiles.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Audio Files',
      state: 'admin.audioFiles'
    });
  }
]);

