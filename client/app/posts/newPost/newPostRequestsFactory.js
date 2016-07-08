/**
 * Created by AncientMachine on 06.07.2016.
 */
(function () {
  'use strict';

  angular
    .module('davidFotograful.dashboard')
    .factory('NewPostFactory', factoryName);

  factoryName.$inject = ['$http'];

  /* @ngInject */
  function factoryName($http, $q) {
    var service = {
      verifyPermalink: verifyPermalink
    };
    return service;

    ////////////////

    function verifyPermalink(permalink) {
      return $http.get('/api/posts/verifyPermalink', {params: {permalink: permalink}}).then(function(response) {
        return response.data;
      })

    }
  }

})();

