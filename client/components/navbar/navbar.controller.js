'use strict';

angular.module('davidFotograful')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Dashboard',
        'link': '/admin',
        'icon': 'glyphicon glyphicon-dashboard navbar-icon'
      },
      //{
      //  'title': 'View',
      //  'link': '/view',
      //  'icon': 'glyphicon glyphicon-dashboard navbar-icon'
      //}
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
