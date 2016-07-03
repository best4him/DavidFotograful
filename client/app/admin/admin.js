'use strict';

angular.module('acrawlerApp.dashboard',[])
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'postsController',
        authenticate: true
      });
  });
