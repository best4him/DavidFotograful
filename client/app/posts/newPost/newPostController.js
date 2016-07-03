/**
 * Created by AncientMachine on 10.04.2016.
 */
(function () {
  'use strict';

  angular
    .module('acrawlerApp.dashboard')
    .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$scope'];

  /* @ngInject */
  function NewPostController($scope) {
    var vm = this;
    vm.title = 'NewPostController';

    activate();

    ////////////////

    function activate() {
      
    }
  }

})();

