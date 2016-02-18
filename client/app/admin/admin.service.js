/**
 * Created by AncientMachine on 18.02.2016.
 */
(function () {
    'use strict';

    angular
        .module('acrawlerApp')
        .factory('adminFactory', adminFactory);

    adminFactory.$inject = ['$http'];

    /* @ngInject */
    function adminFactory($http) {
        var service = {
            getPosts: getPosts
        };
        return service;

        ////////////////

        function getPosts() {

        }
    }

})();

