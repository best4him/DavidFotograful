/**
 * Created by AncientMachine on 10.04.2016.
 */
(function () {
  'use strict';

  angular
    .module('davidFotograful.dashboard')
    .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$scope', 'NewPostFactory', '$uibModal'];

  /* @ngInject */
  function NewPostController($scope, NewPostFactory, $uibModal) {
    $scope.newPost = {};
    $scope.permalinkStates = {
      isPermalinkValid : undefined,
      loading: false,
      error: ''
    };
    $scope.$watch('newPost.title', function(newValue , oldValue) {
      $scope.newPost.permLink = preparePermLink(newValue);
      if (newValue && newValue.length > 1) {
        isPermalinkValid (newValue);
      }
    });

    $scope.publishPost = publishPost;
    $scope.savePost = savePost;
    $scope.reset = reset;
    $scope.openAddNewCategoryModal = openAddNewCategoryModal;
    function publishPost() {

    }
    function savePost(form) {
      console.log("ddd", form.$valid);
      $scope.submitted = true;
    if (form.$valid) {

    }
    }
    function reset() {

    }
    function preparePermLink(title) {
      if(!title) {
        return '';
      }
      return title.toLowerCase()
        .replace(/[^a-z0-9\s]/gi, "").replace(/[\s]/gi, '-');
    }
    function openAddNewCategoryModal() {
     $uibModal.open({
        templateUrl: 'app/posts/newCategory/modalTemplate.html',
        controller: 'CategoryModalCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
    });
    }
    activate();

    ////////////////

    function activate() {
      $scope.people = [
        { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
        { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
        { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
        { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
        { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
        { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
        { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
        { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
        { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
      ];
    }

    function isPermalinkValid (permalink) {
      $scope.permalinkStates = {
        isPermalinkValid : undefined,
        loading : true,
        error: ''
      };

      NewPostFactory.verifyPermalink(permalink).then(function(data) {
        $scope.permalinkStates = {
          isPermalinkValid : data.isValid,
          loading : false
        };
      }).catch(function() {
        $scope.permalinkStates = {
          isPermalinkValid : undefined,
          loading : false,
          error: 'An error has occurred! Please try modify the title!' +
          ' If the problem persist, please contact the web admin!'
        };
      });
    }

  }

})();

