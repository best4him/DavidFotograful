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
      addCategory: addCategory,
      deleteCategory: deleteCategory,
      updateCategory:updateCategory
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
    function deleteCategory(category) {
      return $http.delete('api/categories/' + category._id).then(function(response) {
        return response.data;
      })
    }
    function updateCategory(category) {
      return $http.put('api/categories/'+ category._id, category ).then(function(response) {
        return response.data;
      })
    }
  }

})();

