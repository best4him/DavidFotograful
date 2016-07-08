/**
 * Created by AncientMachine on 07.07.2016.
 */
(function () {
  'use strict';

  angular
    .module('davidFotograful')
    .controller('CategoryModalCtrl', CategoryModalCtrl);

  CategoryModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CategoriesXHRFactory'];

  /* @ngInject */
  function CategoryModalCtrl($scope, $uibModalInstance, CategoriesXHRFactory) {
    $scope.errors = {};
    $scope.newCategory = {};
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.addNewCategory = addNewCategory;

    function addNewCategory(form) {
    $scope.submitted = true;
      if (form.$valid) {
        CategoriesXHRFactory.addCategory({name: "Test"})
          .then(function(data) {
            $scope.newCategory = {};
            console.log("addNewCategorydata", data)
          }).catch(function() {
          $scope.errors.addNewCategory = 'An error has occurred during getting the category!';
          console.log("addNewCategory err")
        });
      }

    }

    activate();

    ////////////////

    function activate() {
      CategoriesXHRFactory.getCategories()
        .then(function(data) {
          $scope.categories = data;
        console.log("data", data)
      }).catch(function() {
        $scope.errors.getCategories = 'An error has occurred during getting the list of categories! Please refresh the page and try again!';
        console.log("getCategories err")
      });
    }
  }

})();

