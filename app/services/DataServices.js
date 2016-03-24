(function(){
    'use strict';

    angular.module('app').service('DataService', function ($http) {
        var getData = function () {
            var req = {

            };
            return $http.get('http://cors.io/?u=http://travelindia-teamshifter.rhcloud.com/api/spots', {
                //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            });
        };

        return {
            getData: getData
        };
    });

})();
