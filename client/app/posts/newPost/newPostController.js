/**
 * Created by AncientMachine on 10.04.2016.
 */
(function () {
  'use strict';

  angular
    .module('davidFotograful.dashboard')
    .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$scope', 'NewPostFactory', '$uibModal', 'CategoriesXHRFactory', 'TagsRequestFactory', 'FileUploader'];

  /* @ngInject */
  function NewPostController($scope, NewPostFactory, $uibModal, CategoriesXHRFactory, TagsRequestFactory, FileUploader) {
    $scope.newPost = {
      categories: [],
      tags: []
    };

    $scope.permalinkStates = {
      isPermalinkValid: undefined,
      loading: false,
      error: ''
    };

    $scope.publishPost = publishPost;
    $scope.savePost = savePost;
    $scope.reset = reset;
    $scope.openAddNewCategoryModal = openAddNewCategoryModal;
    $scope.newPostStates = getDefaultNewPostState();
    var  uploaderCover;
    $scope.uploaderCover = uploaderCover = new FileUploader({
      url: '/api/posts/uploadCoverImage'
    });

    uploaderCover.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
    };
    uploaderCover.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
    };
    uploaderCover.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
    };
    uploaderCover.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
    };
    uploaderCover.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
    };
    uploaderCover.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploaderCover.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploaderCover.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploaderCover.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploaderCover.onCompleteAll = function() {
      console.info('onCompleteAll');
    };
    $scope.uploaderResources = new FileUploader({
      url: '/api/posts/uploadResources'
    });

    $scope.$watch('newPost.title', function (newValue) {
      $scope.newPost.permalink = preparePermLink(newValue);
      if ($scope.newPost.permalink && $scope.newPost.permalink.length > 1) {
        isPermalinkValid($scope.newPost.permalink);
      }
    });

    function getDefaultNewPostState() {
      return {
        loading: false,
        error: false,
        success: false
      };
    }


    function publishPost() {

    }

    function savePost(form) {
      $scope.submitted = true;

      if (form.$valid) {
        $scope.newPostStates = getDefaultNewPostState();
        $scope.newPostStates.loading = true;
        NewPostFactory.addNewPost($scope.newPost)
          .then(function (data) {
            console.log(data);
            $scope.newPostStates.success = true;
          }, function (rejection) {
            console.log(rejection);
            $scope.newPostStates.error = true;
          }).then(function () {
          $scope.newPostStates.loading = false;
        })
      }
    }

    function reset() {

    }

    function preparePermLink(title) {
      if (!title) {
        return '';
      }
      return title.toLowerCase()
        .replace(/[^a-z0-9\s]/gi, "").replace(/[\s]/gi, '-');
    }

    function openAddNewCategoryModal() {
      var categoryModal = $uibModal.open({
        templateUrl: 'app/posts/newCategory/modalTemplate.html',
        controller: 'CategoryModalCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      categoryModal.result.then(function (resolved) {
        getCategories();
      }, function (rejected) {
        getCategories();
      })
    }


    function getCategories() {
      CategoriesXHRFactory.getCategories()
        .then(function (data) {
          $scope.categories = data;
        }).catch(function () {
        $scope.errors.getCategories = 'An error has occurred during getting the list of categories! Please refresh the page to try again!';
      });
    }

    function getTags() {
      TagsRequestFactory.getTags()
        .then(function (tags) {
          $scope.tags = tags.map(function (tag) {
            return tag.name
          });
        }, function () {
          $scope.errors.getTags = 'An error has occurred during getting the list of tags! Please refresh the page to try again!';
        });
    }

    activate();

    ////////////////

    function activate() {
      getCategories();
      getTags();
    }

    function isPermalinkValid(permalink) {
      $scope.permalinkStates = {
        isPermalinkValid: undefined,
        loading: true,
        error: ''
      };

      NewPostFactory.verifyPermalink(permalink).then(function (data) {
        $scope.permalinkStates = {
          isPermalinkValid: data.isValid,
          loading: false
        };
      }).catch(function () {
        $scope.permalinkStates = {
          isPermalinkValid: undefined,
          loading: false,
          error: 'An error has occurred! Please try modify the title!' +
          ' If the problem persist, please contact the web admin!'
        };
      });
    }
  }
})();
