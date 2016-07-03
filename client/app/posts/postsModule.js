/**
 * Created by AncientMachine on 21.02.2016.
 */
angular
    .module('posts', [])
      .config(function ($stateProvider) {
    $stateProvider
      .state('admin.newPost', {
        url: '/new-post',
        templateUrl: 'app/posts/newPost/newPost.html',
        controller: 'NewPostController'
      });

  });
