'use strict';

angular.module('core').service('sharedControllerProperties', function () {
  var showHeader = true;

  return {
    getProperty: function () {return showHeader;},
    setProperty: function(value) {showHeader = value;}
  };
});