/**
 * Created by AncientMachine on 19.07.2016.
 */
(function () {
  'use strict';

  angular
    .module('tags')
    .factory('TagsRequestFactory', tagsRequestFactory);

  tagsRequestFactory.$inject = ['$http'];

  /* @ngInject */
  function tagsRequestFactory($http) {
    var service = {
      getTags: getTags
    };
    return service;

    ////////////////

    function getTags() {
     return $http.get('/api/tags/').then(function(response) {
        return response.data;
      })
    }
  }

})();

