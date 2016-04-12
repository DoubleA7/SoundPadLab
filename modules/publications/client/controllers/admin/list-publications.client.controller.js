'use strict';

angular.module('publications.admin').controller('PublicationListController', ['$scope', '$filter', 'publicationsAdmin',
  function ($scope, $filter, publicationsAdmin) {
    console.log('publications list initialized!');
    publicationsAdmin.query(function (data) {
      $scope.publications = data;
      $scope.buildPager();
    });
    
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.publications, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
