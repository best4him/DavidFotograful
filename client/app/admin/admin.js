'use strict';

angular.module('davidFotograful.dashboard',[])
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        ncyBreadcrumb: {
          label: 'Dashboard'
        },
        authenticate: true
      })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'postsController',
        ncyBreadcrumb: {
          label: 'Posts'
        },
        authenticate: true
      })
      .state('admin.newPost', {
        url: '/new-post',
        templateUrl: 'app/posts/newPost/newPost.html',
        controller: 'NewPostController',
        ncyBreadcrumb: {
          label: 'New Post',
          parent: 'admin.posts'
        },
        authenticate: true
      });;
  });
