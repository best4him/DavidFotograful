/**
 * Created by AncientMachine on 21.02.2016.
 */
'use strict';
(function () {
  'use strict';

  angular
    .module('davidFotograful.dashboard')
    .controller('postsController', postsController);

  postsController.$inject = ['$scope', '$state'];

  /* @ngInject */
  function postsController($scope, $state) {
    $scope.goToNewPost = goToNewPost;
    activate();

    ////////////////

    function activate() {

    }

    function goToNewPost() {
      $state.go('admin.newPost')
    }
  }

})();

