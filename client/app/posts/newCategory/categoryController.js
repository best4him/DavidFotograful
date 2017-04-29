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
    $scope.removeCategory = removeCategory;
    $scope.updateCategory = updateCategory;
    $scope.resetCategoryView = resetCategoryView;

    $scope.showEditForm = function(category) {
      resetCategoryView(category);
      category.showEdit = true;
    };
    $scope.showAskDeleteConfirm = function(category) {
      resetCategoryView(category);
      category.askDeleteConfirm = true;
    };

    function resetCategoryView(category) {
      if (category) {
        category.errors = {};
        if (category.askDeleteConfirm) {
          delete category.askDeleteConfirm;
        }
        if (category.showEdit) {
          delete category.showEdit;
        }
      }
    }
    function addNewCategory(form) {
    $scope.submitted = true;
      $scope.addCategoryDone = '';
      if (form.$valid) {
        CategoriesXHRFactory.addCategory($scope.newCategory)
          .then(function(data) {
            $scope.newCategory = {};
            $scope.submitted = false;
            $scope.categories.unshift(data);
            $scope.addCategoryDone = 'The category has been added!';
            resetAddNewCategoryError();
          }, function(rejection) {
            resetAddNewCategoryError();
            $scope.submitted = false;
            $scope.errors.addNewCategory = 'An error has occurred during adding the new category! ' +
              'The category may already exist!';
          })
      }

    }

    function removeCategory(category) {
      CategoriesXHRFactory.deleteCategory(category)
        .then(function(data) {
            $scope.categories.splice($scope.categories.indexOf(category), 1);
          },
        function(rejection) {
          resetCategoryView(category);
          category.errors = {
            deleteCategory : 'An error has occurred! Please try again!'
          }
        })
    }
    function updateCategory(category) {
      CategoriesXHRFactory.updateCategory(category)
        .then(function(modifiedCategory) {
          $scope.categories[$scope.categories.indexOf(category)] = modifiedCategory;
          },
          function(rejection) {
            resetCategoryView(category);
            console.log("Update faild, rejection");
            category.errors = {
              updateCategory : 'An error has occurred! Please try again!'
            }
          })
    }
    function resetAddNewCategoryError() {
      $scope.errors.addNewCategory= {};
    }
    activate();

    ////////////////

    function activate() {
      CategoriesXHRFactory.getCategories()
        .then(function(data) {
          $scope.categories = data;
      }).catch(function() {

        $scope.errors.getCategories = 'An error has occurred during getting the list of categories! Please refresh the page and try again!';
      });
    }
  }

})();

