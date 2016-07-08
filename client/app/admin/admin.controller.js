'use strict';

angular.module('davidFotograful')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {
    //$scope.toggleLeftBar = false;
    //  $scope.awesomeThings = [];
    //  $scope.isLoggedIn = Auth.isLoggedIn;
    //  $scope.isAdmin = Auth.isAdmin;
    //
    //  $http.get('/api/links').success(function(awesomeThings) {
    //    $scope.awesomeThings = awesomeThings;
    //    socket.syncUpdates('link', $scope.awesomeThings);
    //  });
    //
    //  $scope.addLink = function() {
    //    if($scope.link === '') {
    //      return;
    //    }
    //    $http.post('/api/links', { name: 'http://www.' + $scope.link });
    //    $scope.link = '';
    //  };
    //
    //  $scope.deleteLink = function(link) {
    //    $http.delete('/api/links/' + link._id);
    //  };
    //
    //  $scope.$on('$destroy', function () {
    //    socket.unsyncUpdates('link');
    //  });
    //
    //// Use the User $resource to fetch all users
    //$scope.users = User.query();
    //
    //$scope.delete = function(user) {
    //  User.remove({ id: user._id });
    //  angular.forEach($scope.users, function(u, i) {
    //    if (u === user) {
    //      $scope.users.splice(i, 1);
    //    }
    //  });
    //};
  });
