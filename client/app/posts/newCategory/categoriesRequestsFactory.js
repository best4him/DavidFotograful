/**
 * Created by AncientMachine on 07.07.2016.
 */
(function () {
  'use strict';

  angular
    .module('davidFotograful.dashboard')
    .factory('CategoriesXHRFactory', CategoriesXHRFactory);

  CategoriesXHRFactory.$inject = ['$http'];

  /* @ngInject */
  function CategoriesXHRFactory($http) {
    var service = {
      getCategories: getCategories,
      addCategory: addCategory
    };
    return service;

    ////////////////

    function getCategories() {
      return $http.get('api/categories').then(function(response) {
        return response.data;
      })
    }
    function addCategory(category) {
      return $http.post('api/categories', category).then(function(response) {
        return response.data;
      })
    }
  }

})();

